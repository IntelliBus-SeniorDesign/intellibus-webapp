# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 11/06/2021
# PURPOSE: This is the a python script that synthesizes a APC. Sends fake (predeteremined) GPS and passenger count to our APC.
# SPECIAL NOTES:
# ===============================
# Change History:
# Added random ingress/egress passenger data. Added random time stop time at Stop WP.
# ==================================

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

total_passengers = random.randint(2,10)


# send GPS data using MQTT to broker
for item in ext.greenRoute:
    # if item has stop in wp name, random generate the passenger ingress/egress
    ingress = 0
    egress = 0
    stopmoving = False
    if 'Stop' in item['name']:
        stopmoving = True
        chooseGreater = random.randint(0,1)
        stopcounts = 0
        if chooseGreater == 1:
            while True:
                # Ingress gets higher bound of random no
                ingress = random.randint(5,11)
                # Egress gets lower bound of random no
                egress = random.randint(4,7)
                stopscounts = total_passengers + ingress - egress
                if stopscounts >= 0 and stopscounts < 30:
                    break
        elif chooseGreater == 0:
            while True:
                # Ingress gets lower bound of random no
                ingress = random.randint(4,7)
                # Egress gets higer bound of random no
                egress = random.randint(5,11)
                stopscounts = total_passengers + ingress - egress
                if stopscounts >= 0 and stopscounts < 30:
                    break
    if stopmoving:
        total_passengers  = total_passengers + ingress - egress
        # build payload
        messageJson = {}
        messageJson['deviceID'] = 101
        now = datetime.datetime.utcnow()
        messageJson['timestamp'] = int(time.time())
        messageJson['coordinate'] = [item['lat'], item['lon']] 
        messageJson['wp_name'] = item['name']
        messageJson['ingress'] = ingress
        messageJson['egress'] = egress
        messageJson['total_passengers'] = total_passengers
        messageJson['stop_move'] = stopmoving

        # send payload over MQTT connection
        messageJson = json.dumps(messageJson)
        myAWSIoTMQTTClient.publish(topic, messageJson, 1)
        print('Published topic %s: %s\n' % (topic, messageJson))
        # send data every x seconds since its a stop
        stop_time = random.randint(30,45)
        time.sleep(stop_time)
    else:
        # build payload
        messageJson = {}
        messageJson['deviceID'] = 101
        now = datetime.datetime.utcnow()
        messageJson['timestamp'] = int(time.time())
        messageJson['coordinate'] = [item['lat'], item['lon']] 
        messageJson['wp_name'] = item['name']
        messageJson['total_passengers'] = total_passengers
        messageJson['stop_move'] = stopmoving
        # send payload over MQTT connection
        messageJson = json.dumps(messageJson)
        myAWSIoTMQTTClient.publish(topic, messageJson, 1)
        print('Published topic %s: %s\n' % (topic, messageJson))
        # send data every 2 seconds
        time.sleep(2)
