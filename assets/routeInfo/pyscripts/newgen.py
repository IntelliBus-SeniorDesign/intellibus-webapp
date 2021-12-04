# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 09/19/2021
# PURPOSE: This is the py script to automate entering Stop info into DynamoDB.
# SPECIAL NOTES:
# ===============================
# Change History:
# 11/10/21: Updated this script to correctly parse from routes instead of stops.
# ==================================
import json 
import boto3
from decimal import Decimal

AWS_KEY = ""
AWS_SECRET = ""
REGION = "us-east-2"

dynamodb = boto3.resource('dynamodb', aws_access_key_id = AWS_KEY, aws_secret_access_key = AWS_SECRET, region_name = REGION)
table = dynamodb.Table('intellibus-webapp-routes_stops')

stopsJson = open('../busstop_only.json', 'r')
routesJson = open('../busroute_only.json', 'r')

stop_data = json.load(stopsJson, parse_float=Decimal)
route_data = json.load(routesJson, parse_float= Decimal)

# dict array of ['stopID':[lat, long, name, position, radius]]
stopID = []

for item in stop_data['stops']:
    stopID.append({'stopID': item,'data':[stop_data['stops'][item]['latitude'], stop_data['stops'][item]['longitude'], stop_data['stops'][item]['name'], int(stop_data['stops'][item]['position']), stop_data['stops'][item]['radius'] ]})

red_route_raw = ['Red', '#e60000', 1, ['1', '18856', 0], ['2', '18858', 0], ['3', '18883', 0], ['4', '554', 0], ['5', '9782', 0], ['6', '578', 0], ['7', '9891', 0], ['8', '9892', 0], ['9', '581', 0], ['11', '583', 0], ['12', '584', 0], ['13', '585', 0], ['14', '9890', 0], ['15', '587', 0], ['16', '18852', 0], ['17', '9889', 0]]
green_route_raw = ['Green', '#2ca02c', 1, ['1', '546', 0], ['2', '547', 0], ['3', '548', 0], ['4', '549', 0], ['5', '550', 0], ['6', '582', 0], ['7', '9794', 0], ['8', '18860', 0], ['9', '568', 0], ['10', '569', 0], ['11', '554', 0], ['12', '9782', 0], ['13', '581', 0], ['14', '563', 0], ['15', '564', 0], ['16', '565', 0]]

# # loop through routes and build the stop information for red and green route
# for item in route_data['routes']:
#     if item == '6214' or item == '6217':
#         route_name = route_data['routes'][item][0]
#         # loop through the other arrays
#         for ii in range(3, len(route_data['routes'][item])):
#             print(route_data['routes'][item])
#             # stop is
#             stop = 'ID' + route_data['routes'][item][ii][1]
#             position = route_data['routes'][item][ii][0]
#             # match the number to stop array and join the info 
#             # use function generator and find index
#             stop_pos = next((thing for thing in stopID if thing['stopID'] == stop), None)
#             item = {
#                 'routeID': item,
#                 'routeName': route_name,
#                 'position' : position,
#                 'stopID' : stop,
#                 'latitude': stop_pos['data'][0],
#                 'longitude' : stop_pos['data'][1],
#                 'stopName': stop_pos['data'][2],
#                 'radius': stop_pos['data'][4]
#             }
#             print(item)


for ii in range(3,len(red_route_raw)):
    # use function generator and find index
    route_name = 'Red'
    stop = 'ID' + red_route_raw[ii][1]
    position = red_route_raw[ii][0]
    # use function generator and find index
    stop_pos = next((thing for thing in stopID if thing['stopID'] == stop), None)

    # item = table.put_item(
    #     Item = {
    #     'routeID': str(6217),
    #     'routeName': route_name,
    #     'position' : position,
    #     'stopID' : stop,
    #     'latitude': stop_pos['data'][0],
    #     'longitude' : stop_pos['data'][1],
    #     'stopName': stop_pos['data'][2],
    #     'radius': stop_pos['data'][4]
    #     }
    # )
    item = {
        'routeID': str(6217),
        'routeName': route_name,
        'position' : position,
        'stopID' : stop,
        'latitude': stop_pos['data'][0],
        'longitude' : stop_pos['data'][1],
        'stopName': stop_pos['data'][2],
        'radius': stop_pos['data'][4]
        }
    print(item)

for ii in range(3,len(green_route_raw)):
    # use function generator and find index
    route_name = 'Green'
    stop = 'ID' + green_route_raw[ii][1]
    position = green_route_raw[ii][0]
    # use function generator and find index
    stop_pos = next((thing for thing in stopID if thing['stopID'] == stop), None)
    # stop_item = {
    #     'routeID': item,
    #     'routeName': route_name,
    #     'position' : position,
    #     'stopID' : stop,
    #     'latitude': stop_pos['data'][0],
    #     'longitude' : stop_pos['data'][1],
    #     'stopName': stop_pos['data'][2],
    #     'radius': stop_pos['data'][4]
    # }
    # item = table.put_item(
    #     Item = {
    #     'routeID': '6214',
    #     'routeName': route_name,
    #     'position' : position,
    #     'stopID' : stop,
    #     'latitude': stop_pos['data'][0],
    #     'longitude' : stop_pos['data'][1],
    #     'stopName': stop_pos['data'][2],
    #     'radius': stop_pos['data'][4]
    # }
    # )

routesJson.close()
stopsJson.close()