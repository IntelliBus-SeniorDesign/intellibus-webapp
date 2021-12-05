# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 11/28/2021
# PURPOSE: This is the Lambda Function that cleans up data from IoT and places into Kinesis Stream.
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================

import json
import boto3
# import botocore.config
import uuid
# from boto3 import kinesis

# insert deviceInfo Updates into Device Management table
REGION = 'us-east-2'
dynamodb = boto3.resource('dynamodb', region_name = REGION)
table_deviceDB = dynamodb.Table('deviceDB')
table_deviceRaw = dynamodb.Table('APC_rawData')

def lambda_handler(event, context):
    
    # init kinesis client
    kinesis_client = boto3.client('kinesis')
    
    response = kinesis_client.put_record(
        StreamName = 'dev_IoTTestUnitStream',
        Data = json.dumps(event['reported']),
        PartitionKey = '102'
        )
        
    # if stop_move is true, then store in raw data in DB
    if(event['reported']['stop_move']):
        # build data
        deviceID = int(event['reported']['deviceID'])
        lastCheckIn = int(event['reported']['timestamp'])
        battery = event['reported']['batv']
        # payload = event['reported']
        coordinate = [event['reported']['latitude'], event['reported']['longitude']] 
        wp_name = 'NULL'
        ingress = event['reported']['ingress']
        egress = event['reported']['egress']
        total_passengers = event['reported']['total_passengers']
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