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
from boto3 import kinesis

def lambda_handler(event, context):
    
    REGION = 'us-east-2'
    kinesis_client = kinesis.connect_to_region(REGION)

    kinesis_client.put_record(
        "dev_greenRouteStream",
        json.dumps(event['reported']),
        "102"
    )
    
    # dynamodb = boto3.resource('dynamodb', region_name = REGION)
    # table = dynamodb.Table('intellibus_testMQTT')
    # # test event info
    # response = table.put_item(
    #     Item ={
    #         'deviceID': int(event['reported']['deviceID']),
    #         'timestamp':  int(event['reported']['timestamp']),
    #         'message': "Test Trigger from Lambda"
    #     }
        
    #     # Item ={
    #     #     'deviceID': 102,
    #     #     'timestamp':  1637690214943,
    #     #     'message': "Test Trigger from Lambda"
    #     # }
    # )



    