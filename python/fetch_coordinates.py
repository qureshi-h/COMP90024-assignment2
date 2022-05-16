import geopandas as gpd
from shapely.geometry import Point
import os

def get_region(coordinates, option="lga"):
    coordinates = Point(coordinates)

    shape_file = "../res/SA3_2021_AUST_GDA2020.shp"
    if option == "lga":
        shape_file = '../res/vic_lga.shp'

    gdf = gpd.read_file(shape_file)
    gdf = gdf.to_crs(epsg=4326)
    for row in gdf.iterrows():
        if row[1]["geometry"] is not None and row[1]["geometry"].contains(coordinates):
            if option == "lga":
                return row[1]["LGA_NAME"]
            return row[1]["SA3_NAME21"]

    return False


# print(get_region((35, -144)))
