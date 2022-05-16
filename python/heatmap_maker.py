import folium
import numpy as np
import pandas as pd
import json
import requests
import shapefile as shp
import geopandas as gpd

regionTweets = requests.get('http://admin:admin@172.26.133.72:5984/tweets/_design/CountSpecs/_view/RegionNumberofTweetsCounter?group=true')
regionTweetsJson = json.loads(regionTweets.text)


shp_path = "LGA_Information\\feb22_vic_lga_polygon_shp\\VIC_LGA_POLYGON_shp\\vic_lga.shp"

# sf = shp.Reader(shp_path)
# fields = [x[0] for x in sf.fields][1:]
# records = sf.records()
# shps = [s.points for s in sf.shapes()]
# df_acc = pd.DataFrame(columns=fields, data=records)
# df_acc = df_acc.assign(coords=shps)
# df_acc["numberOfTweets"] = 0
# for index, row in df_acc.iterrows():
#     for regions in regionTweetsJson["rows"]:
#         if row["LGA_NAME"]==regions["key"]:
#             print(row["LGA_NAME"])
#             df_acc.at[index,'numberOfTweets'] = regions["value"]

# print(df_acc)

df = gpd.read_file(shp_path)
df['geoid'] = df.index.astype(str)
df["numberOfTweets"] = 0
for index, row in df.iterrows():
    for regions in regionTweetsJson["rows"]:
        if row["LGA_NAME"]==regions["key"]:
            df.at[index,'numberOfTweets'] = regions["value"]

# copy the data
df_min_max_scaled = df.copy()

# apply normalization techniques by Column 1
column = 'numberOfTweets'
df_min_max_scaled['numberOfTweets'] = df_min_max_scaled['numberOfTweets']+1
print(df_min_max_scaled)
df_min_max_scaled['numberOfTweets'] = np.log(df_min_max_scaled['numberOfTweets'])
df_min_max_scaled['numberOfTweets'] = df_min_max_scaled['numberOfTweets']+1
# print(df_min_max_scaled)

df_min_max_scaled[column] = (df_min_max_scaled[column] - df_min_max_scaled[column].min()) / (df_min_max_scaled[column].max() - df_min_max_scaled[column].min())	
# print(df_min_max_scaled)

heat_map = folium.Map(location=[-37.8136, 144.9631], tiles = 'Stamen Terrain', zoom_start = 11, control_scale=True)

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



heat_map.save('index.html')