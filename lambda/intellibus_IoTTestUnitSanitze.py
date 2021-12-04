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

def lambda_handler(event, context):
    
    # init kinesis client
    kinesis_client = boto3.client('kinesis')
    
    response = kinesis_client.put_record(
        StreamName = 'dev_greenRouteStream',
        Data = json.dumps(event['reported']),
        PartitionKey = '102'
        )
        
    # if stop_move is true, then store in raw data in DB
    # if(event['reported']['stop_move'])