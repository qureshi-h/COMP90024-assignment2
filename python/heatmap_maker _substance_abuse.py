from re import L
import folium
import numpy as np
import json
import requests
import geopandas as gpd

regionTweets = requests.get("http://admin:admin@172.26.133.72:5984/tweets/_design/CountSpecs/_view/RegionTweetDisplay?key=\"substance abuse\"")
regionTweetsJson = json.loads(regionTweets.text)

regionAurinData = requests.get("http://admin:admin@172.26.133.72:5984/lga_profiles/_design/Stats/_view/SubstanceAbuse")
regionAurinJson = json.loads(regionAurinData.text)

shp_path = "LGA_Information\\feb22_vic_lga_polygon_shp\\VIC_LGA_POLYGON_shp\\vic_lga.shp"

mapper_object = {}
for regions in regionTweetsJson["rows"]:
    lga_name = regions["value"]["region"]
    if lga_name in mapper_object:
        mapper_object[lga_name] = mapper_object[lga_name] + 1
    else:
        mapper_object[lga_name] = 1

df = gpd.read_file(shp_path)
df['geoid'] = df.index.astype(str)
df["numberOfTweets"] = 0
for index, row in df.iterrows():
    lga_name = row["LGA_NAME"]
    if lga_name in mapper_object:
        df.at[index,'numberOfTweets'] = mapper_object[lga_name]

df["Percentage of adults(18+) who are current smokers"] = 0
df["Drug and alcohol treatments per 1000"] = 0

for index, row in df.iterrows():
    for regions in regionAurinJson["rows"]:
        if row["LGA_NAME"]==regions["key"]:
            df.at[index,'Percentage of adults(18+) who are current smokers'] = regions["value"]["Percentage of adults(18+) who are current smokers"]
            df.at[index,'Drug and alcohol treatments per 1000'] = regions["value"]["Drug and alcohol treatments per 1000"]

# copy the data
df_min_max_scaled = df.copy()

# apply normalization techniques by Column 1
column = 'numberOfTweets'
df_min_max_scaled['numberOfTweets'] = df_min_max_scaled['numberOfTweets']+1
df_min_max_scaled['numberOfTweets'] = np.log(df_min_max_scaled['numberOfTweets'])
df_min_max_scaled['numberOfTweets'] = df_min_max_scaled['numberOfTweets']+1

df_min_max_scaled[column] = (df_min_max_scaled[column] - df_min_max_scaled[column].min()) / (df_min_max_scaled[column].max() - df_min_max_scaled[column].min())	

heat_map = folium.Map(location=[-37.8136, 144.9631], tiles = 'Stamen Terrain', zoom_start = 10, control_scale=True)

points_gjson = folium.features.GeoJson(df, name="Local Government Areas")
points_gjson.add_to(heat_map)


# Plot a choropleth map
# Notice: 'geoid' column that we created earlier needs to be assigned always as the first column
folium.Choropleth(
    geo_data=df_min_max_scaled,
    name='Tweets',
    data=df_min_max_scaled,
    columns=['geoid', 'numberOfTweets'],
    key_on='feature.id',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.2,
    line_color='white', 
    line_weight=0,
    highlight=False, 
    smooth_factor=1.0,
    # threshold_scale=[2,10,25,50,100,200,400,800],
    legend_name= 'Number of Tweets').add_to(heat_map)

style_function = lambda x: {'fillColor': '#ffffff', 
                            'color':'#000000', 
                            'fillOpacity': 0.1, 
                            'weight': 0.1}
highlight_function = lambda x: {'fillColor': '#000000', 
                                'color':'#000000', 
                                'fillOpacity': 0.50, 
                                'weight': 0.1}


for i in range(len(df)):
    row = df.loc[[i]]
    feature = folium.features.GeoJson(
        row,
        style_function=style_function,
        control=False,
        highlight_function=highlight_function,
        tooltip=folium.features.GeoJsonTooltip(
            fields=[
                'Percentage of adults(18+) who are current smokers',
                'Drug and alcohol treatments per 1000',
            ],
            aliases=[
                "Percentage of adults(18+) who are current smokers: ",
                "Drug and alcohol treatments per 1000: ",
            ],
            style=("background-color: white; color: #333333; font-family: arial; font-size: 12px; padding: 10px;")
        )
    )
    heat_map.add_child(feature)
    heat_map.keep_in_front(feature)


heat_map.save('plots/substanceAbuseHeatMap.html')
print("plots/substanceAbuseHeatMap.html", end="")