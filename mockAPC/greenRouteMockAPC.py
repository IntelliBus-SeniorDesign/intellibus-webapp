from AWSIoTPythonSDK.MQTTLib import AWSIoTMQTTClient
import logging
import time
import argparse
import sys,os
import json
import datetime
import random
# from dateutil.tz import tzoffset


# import green route fake GPS data
import greenRouteData as ext


AllowedActions = ['both', 'publish', 'subscribe']

host = 'afvi82z02r2mg-ats.iot.us-east-2.amazonaws.com'
rootCAPath = 'certs_and_keys/root-CA.crt'
certificatePath = 'certs_and_keys/dev_mockAPC.cert.pem'
privateKeyPath = 'certs_and_keys/dev_mockAPC.private.key'
useWebsocket = False
clientId = 'basicPubSub'
topic = 'devmockAPC/data'

# Port defaults
if useWebsocket:  # When no port override for WebSocket, default to 443
    port = 443
if not useWebsocket:  # When no port override for non-WebSocket, default to 8883
    port = 8883

print("FILE PATH")
print(os.path.dirname(sys.argv[0]))
# Configure logging
'''
logger = logging.getLogger("AWSIoTPythonSDK.core")
logger.setLevel(logging.DEBUG)
streamHandler = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
streamHandler.setFormatter(formatter)
logger.addHandler(streamHandler)
'''

# Init AWSIoTMQTTClient
myAWSIoTMQTTClient = None
if useWebsocket:
    myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId, useWebsocket=True)
    myAWSIoTMQTTClient.configureEndpoint(host, port)
    myAWSIoTMQTTClient.configureCredentials(rootCAPath)
else:
    myAWSIoTMQTTClient = AWSIoTMQTTClient(clientId)
    myAWSIoTMQTTClient.configureEndpoint(host, port)
    myAWSIoTMQTTClient.configureCredentials(rootCAPath, privateKeyPath, certificatePath)

# AWSIoTMQTTClient connection configuration
myAWSIoTMQTTClient.configureAutoReconnectBackoffTime(1, 32, 20)
myAWSIoTMQTTClient.configureOfflinePublishQueueing(-1)  # Infinite offline Publish queueing
myAWSIoTMQTTClient.configureDrainingFrequency(2)  # Draining: 2 Hz
myAWSIoTMQTTClient.configureConnectDisconnectTimeout(10)  # 10 sec
myAWSIoTMQTTClient.configureMQTTOperationTimeout(5)  # 5 sec

# Connect and subscribe to AWS IoT
myAWSIoTMQTTClient.connect()

time.sleep(2)

# send GPS data using MQTT to broker
for item in ext.greenRoute:
    # if item has stop in wp name, random generate the passenger ingress/egress
    # random.randint(0,1)
    
    # build payload
    messageJson = {}
    messageJson['deviceID'] = 101
    now = datetime.datetime.utcnow()
    messageJson['timestamp'] = int(time.time())
    messageJson['coordinate'] = [item['lat'], item['lon']] 
    messageJson['wp_name'] = item['name']

    # send payload over MQTT connection
    messageJson = json.dumps(messageJson)
    myAWSIoTMQTTClient.publish(topic, messageJson, 1)
    print('Published topic %s: %s\n' % (topic, messageJson))
    # send data every 2 seconds
    time.sleep(2)
