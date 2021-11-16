import shlex
file = open('GreenRouteSimFile2.gpx')

# for file 1 start
# lat_lon_list = [{'name': 'Stop0: WP12-L', 'lat': '33.77325', 'lon': '-84.39701'}]

# for file 2 start 
lat_lon_list = []

lat = ''
lon = ''
name = ''
for line in file:
    line_list = shlex.split(line)
    if '<rtept' in line_list:
        # extract the lat and long value
        lat = line_list[1][4:]
        lon = line_list[2][4:len(line_list[2])-1]
    elif '<name>' in line_list[0]:
        # extract the name
        name = line_list[0][6:len(line_list[0])- 7]
        # stops for file 1
        # if name == 'WP29':
        #     lat_lon_list.append({'name': 'Stop1: WP04-D', 'lat': '33.77335', 'lon': '-84.39917'})
        # elif name == 'WP59':
        #     lat_lon_list.append({'name': 'Stop2: WP03-C', 'lat': '33.7751', 'lon': '-84.40265'})
        # elif name == 'WP78':
        #     lat_lon_list.append({'name': 'Stop3: WP02-B', 'lat': '33.77796', 'lon': '-84.40201'})
        # elif name == 'WP109':
        #     lat_lon_list.append({'name': 'Stop4: WP01-A', 'lat': '33.77836', 'lon': '-84.39956'})
        # elif name == 'WP118':
        #     lat_lon_list.append({'name': 'Stop5: WP09-I', 'lat': '33.78021', 'lon': '-84.39901'})
        # elif name == 'WP186':
        #     lat_lon_list.append({'name': 'Stop6: WP10-J', 'lat': '33.78162', 'lon': '-84.40408'})
        # elif name == 'WP197':
        #     lat_lon_list.append({'name': 'Stop7: WP11-K', 'lat': '33.78432', 'lon': '-84.40574'})
        # elif name == 'WP210':
        #     lat_lon_list.append({'name': 'Stop8: WP05-E', 'lat': '33.78637', 'lon': '-84.40532'})
        # elif name == 'WP246':
        #     lat_lon_list.append({'name': 'Stop9: WP06-F', 'lat': '33.78613', 'lon': '-84.3988'})
        # elif name == 'WP263':
        #     lat_lon_list.append({'name': 'Stop10: WP07-G', 'lat': '33.78628', 'lon': '-84.39559'})
        
        # stops for file 2
        if name == 'WP14-N':
            lat_lon_list.append({'name': 'Stop11: WP08-H', 'lat': '33.78035', 'lon': '-84.39923'})
        elif name == 'WP44':
            lat_lon_list.append({'name': 'Stop12: WP01-A', 'lat': '33.77836', 'lon': '-84.39956'})
        elif name == 'WP65':
            lat_lon_list.append({'name': 'Stop13: WP02-B', 'lat': '33.77796', 'lon': '-84.40201'})
        elif name == 'WP92':
            lat_lon_list.append({'name': 'Stop14: WP03-C', 'lat': '33.7751', 'lon': '-84.40265'} )
        elif name == 'WP134':
            lat_lon_list.append({'name': 'Stop15: WP04-D', 'lat': '33.77335', 'lon': '-84.39917'})
    elif '</rtept>' in line_list:
        lat_long_dict = {'name': name, 'lat': lat, 'lon': lon}
        # print(lat_long_dict)
        lat_lon_list.append(lat_long_dict)
        lat = ''
        lon = ''
        name = ''

# add last stop from file 2
lat_lon_list.append({'name': 'Stop16: WP12-L', 'lat': '33.77325', 'lon': '-84.39701'})

# print and close file
# for item in lat_lon_list:
#     print(item)

print(lat_lon_list)
file.close()