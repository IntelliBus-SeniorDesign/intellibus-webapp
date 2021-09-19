# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 09/19/2021
# PURPOSE: This is the Lambda Function that gets all the Routes and Stops informtion for IntelliBus.
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================
import boto3

REGION = 'us-east-2'
dynamodb = boto3.resource('dynamodb', region_name = REGION)
table = dynamodb.Table('intellibus-webapp-routes_stops')

def lambda_handler(event, context):
    response = table.scan()
    items = response['Items']

    return {
        'statusCode': 200,
        'body': items
    }

    