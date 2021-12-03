# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 12/01/2021
# PURPOSE: This is the Lambda Function that gets all count data stored in Dynamo for a time frame
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================
import json
import boto3
from datetime import date, datetime, timedelta
from boto3.dynamodb.conditions import Key

REGION = 'us-east-2'
dynamodb = boto3.resource('dynamodb', region_name = REGION)
table = dynamodb.Table('deviceHistoryDB')

def lambda_handler(event, context):
    
    # date_param is expecting YYYY-MM-DD
    date_param = event['params']['querystring']['time']
    deviceID = int(event['params']['querystring']['deviceID'])

    # check date param is set
    if date_param:
        response = table.query(
            KeyConditionExpression = Key('deviceID').eq(deviceID) & Key('date').eq(date_param)
        )
        items = response['Items']

        if items:
            return {
                'statusCode': 200,
                'body': items
            }
        else:
            return {
                'statusCode': 200,
                'body': 'Empty Data Set'
            }
    else:
        return {
        'statusCode': 400,
        'body': 'Parameters not met'
        }
