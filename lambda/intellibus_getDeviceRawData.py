# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 12/01/2021
# PURPOSE: This is the Lambda Function that gets the device for the route on the day request.
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================
import json
import boto3
from datetime import datetime, timedelta
from boto3.dynamodb.conditions import Key

REGION = 'us-east-2'
dynamodb = boto3.resource('dynamodb', region_name = REGION)
table = dynamodb.Table('APC_rawData')

def lambda_handler(event, context):
    time_param = event['params']['querystring']['time']
    deviceID = int(event['params']['querystring']['deviceID'])

    # time param can either be starting TS or 'ALL'
    if time_param:
        if time_param == 'ALL':
            response = table.query(
                KeyConditionExpression = Key('deviceID').eq(deviceID) 
            )
            items = response['Items']
            return {
                'statusCode': 200,
                'body': items
            }
        else:
            time_param = int(time_param)
            now = int(datetime.timestamp(datetime.now()))
            response = table.query(
                KeyConditionExpression = Key('deviceID').eq(deviceID) & Key('timestamp').between(time_param, now)
            )
            return {
                'statusCode': 200,
                'body': response['Items']
            }
    else:
        return {
        'statusCode': 400,
        'body': 'Parameters not met'
        }
