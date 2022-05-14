import geopandas as gpd
from shapely.geometry import Point

output_name = ""
shape_file_type = input("Enter 1 for sa3 and 2 for lga:")
latitude = input("Enter latitude:") #Example 144.986457
longitude = input("Enter longitude:") #Example -37.84095

if(shape_file_type == "1"): 
    sa3_coords = gpd.read_file('SA3_2021_AUST_GDA2020.shp')
    sa3_coords = sa3_coords.to_crs(epsg=4326)
    coordinate_point = Point(float(latitude),float(longitude))
    for row in sa3_coords.iterrows():
        if row[1]["geometry"]!=None and row[1]["geometry"].contains(coordinate_point):
            output_name = row[1]["SA3_NAME21"]   
else:
    lga_coords = gpd.read_file('vic_lga.shp')
    lga_coords = lga_coords.to_crs(epsg=4326)
    coordinate_point = Point(float(latitude),float(longitude))
    for row in lga_coords.iterrows():
        if row[1]["geometry"].contains(coordinate_point):
            output_name = row[1]["LGA_NAME"]

print(output_name)