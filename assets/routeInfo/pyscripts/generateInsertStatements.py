import json 
import boto3
from decimal import Decimal

AWS_KEY = ""
AWS_SECRET = ""
REGION = "us-east-2"

dynamodb = boto3.resource('dynamodb', aws_access_key_id = AWS_KEY, aws_secret_access_key = AWS_SECRET, region_name = REGION)
table = dynamodb.Table('intellibus-webapp-routes_stops')

routesJson = open('../busstop_only.json', 'r')

data = json.load(routesJson, parse_float=Decimal)


for i in data['stops']:
    # print(data['stops'][i])
    item = table.put_item(
        Item = {
            "routeID": int(data['stops'][i]['routeId']),
            "stopID": int(data['stops'][i]['stopId']),
            "position": int(data['stops'][i]['position']),
            "name": data['stops'][i]['name'],
            "latitude": data['stops'][i]['latitude'],
            "longitude": data['stops'][i]['longitude'],
            "id": int(data['stops'][i]['id']),
            "radius": data['stops'][i]['radius'],
            "routeName": data['stops'][i]['routeName']
        }
    )

routesJson.close()