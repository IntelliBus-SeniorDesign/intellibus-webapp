# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 11/28/2021
# PURPOSE: This is the Lambda Function that cleans up data from IoT and places into Kinesis Stream and adds stop_move into DynamoDB.
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================

import json
import boto3
from boto3 import kinesis

def lambda_handler(event, context):
    
    REGION = 'us-east-2'
    kinesis_client = kinesis.connect_to_region(REGION)

    kinesis_client.put_record(
        "dev_greenRouteStream",
        json.dumps(event['reported']),
        "102"
    )
    
    if(event['reported']['stop_move']):
        # insert deviceInfo Updates into Device Management table
        dynamodb = boto3.resource('dynamodb', region_name = REGION)
        table_deviceDB = dynamodb.Table('deviceDB')
        table_deviceRaw = dynamodb.Table('APC_rawData')
        # build data
        deviceID = int(event['reported']['deviceID'])
        lastCheckIn = int(event['reported']['ts'])
        battery = event['reported']['batv']
        # payload = event['reported']
        coordinate = [event['reported']['latitude'], event['reported']['longitude']] 
        wp_name = 'NULL'
        ingress = event['reported']['ingress']
        egress = event['reported']['egress']
        total_passengers = event['reported']['pc']
        stop_move = event['reported']['stop_move']

        response = table_deviceDB.update_item(
            Key = {
                'deviceID': deviceID,
                'deviceType': 'Dev Test Unit'
            },
            UpdateExpression = "set lastCheckIn=:l, battery=:b",
            ExpressionAttributeValues = {
                ':l': lastCheckIn,
                ':b': battery
            }
        )

        response = table_deviceRaw.put_item(
            Item = {
                'deviceID': deviceID,
                'timestamp': lastCheckIn,
                'coordinate':coordinate,
                'wp_name':wp_name,
                'ingress':ingress,
                'egress':egress,
                'total_passengers':total_passengers,
                'stop_move': stop_move
            }
        )

    



    