import geopandas as gpd
from shapely.geometry import Point

lga_coords = gpd.read_file('vic_lga.shp')
lga_coords = lga_coords.to_crs(epsg=4326)

# print(lga_coords)
coordinate_point = Point(144.986457,-37.84095)

lga_name = ""
for row in lga_coords.iterrows():
    # print(row)
    if row[1]["geometry"].contains(coordinate_point):
        lga_name = row[1]["LGA_NAME"]

print(lga_name)
