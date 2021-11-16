# ===============================
# AUTHOR: Shadman Ahmed
# Team: IntelliBus 
# CREATE DATE: 10/28/2021
# PURPOSE: This is the Lambda Function that provide fake bus GPS data for testing. 
# SPECIAL NOTES:
# ===============================
# Change History:
# 
# ==================================

def lambda_handler(event, context):


    return {
        'statusCode': 200,
        'body': 
        [
            {"name": "Stop0: WP12-L", "lat": "33.77325", "lon": "-84.39701"},
            {"name": "WP13-M", "lat": "33.77329", "lon": "-84.39716"},
            {"name": "WP14-N", "lat": "33.77316", "lon": "-84.39726"},
            {"name": "WP15-O", "lat": "33.77305", "lon": "-84.39717"},
            {"name": "WP16-P", "lat": "33.77302", "lon": "-84.39703"},
            {"name": "WP17-Q", "lat": "33.77285", "lon": "-84.39712"},
            {"name": "WP18-R", "lat": "33.77285", "lon": "-84.39727"},
            {"name": "WP19-S", "lat": "33.773", "lon": "-84.39749"},
            {"name": "WP20-T", "lat": "33.77312", "lon": "-84.3977"},
            {"name": "WP21-U", "lat": "33.77319", "lon": "-84.39792"},
            {"name": "WP22-V", "lat": "33.77325", "lon": "-84.39808"},
            {"name": "WP23-W", "lat": "33.7733", "lon": "-84.39824"},
            {"name": "WP24-X", "lat": "33.77333", "lon": "-84.39838"},
            {"name": "WP25-Y", "lat": "33.77335", "lon": "-84.39854"},
            {"name": "WP26-Z", "lat": "33.77338", "lon": "-84.39873"},
            {"name": "WP27", "lat": "33.77341", "lon": "-84.39889"},
            {"name": "WP28", "lat": "33.77341", "lon": "-84.39903"},
            {"name": "Stop1: WP04-D", "lat": "33.77335", "lon": "-84.39917"},
            {"name": "WP29", "lat": "33.77346", "lon": "-84.39932"},
            {"name": "WP30", "lat": "33.7735", "lon": "-84.39949"},
            {"name": "WP31", "lat": "33.77353", "lon": "-84.39965"},
            {"name": "WP32", "lat": "33.77357", "lon": "-84.39981"},
            {"name": "WP33", "lat": "33.7736", "lon": "-84.39997"},
            {"name": "WP34", "lat": "33.77362", "lon": "-84.40014"},
            {"name": "WP35", "lat": "33.77365", "lon": "-84.4003"},
            {"name": "WP36", "lat": "33.77365", "lon": "-84.40043"},
            {"name": "WP37", "lat": "33.7737", "lon": "-84.40057"},
            {"name": "WP38", "lat": "33.77371", "lon": "-84.40072"},
            {"name": "WP39", "lat": "33.77374", "lon": "-84.40088"},
            {"name": "WP40", "lat": "33.77376", "lon": "-84.40102"},
            {"name": "WP41", "lat": "33.77378", "lon": "-84.40118"},
            {"name": "WP42", "lat": "33.77378", "lon": "-84.40131"},
            {"name": "WP43", "lat": "33.77381", "lon": "-84.40145"},
            {"name": "WP44", "lat": "33.7741", "lon": "-84.4023"},
            {"name": "WP45", "lat": "33.77386", "lon": "-84.40169"},
            {"name": "WP46", "lat": "33.7739", "lon": "-84.40179"},
            {"name": "WP47", "lat": "33.77394", "lon": "-84.40187"},
            {"name": "WP48", "lat": "33.77399", "lon": "-84.40194"},
            {"name": "WP49", "lat": "33.77402", "lon": "-84.40202"},
            {"name": "WP50", "lat": "33.77406", "lon": "-84.40209"},
            {"name": "WP51", "lat": "33.77411", "lon": "-84.40216"},
            {"name": "WP52", "lat": "33.77418", "lon": "-84.40223"},
            {"name": "WP53", "lat": "33.77424", "lon": "-84.4023"},
            {"name": "WP54", "lat": "33.77437", "lon": "-84.40237"},
            {"name": "WP55", "lat": "33.77445", "lon": "-84.40245"},
            {"name": "WP56", "lat": "33.77465", "lon": "-84.40249"},
            {"name": "WP57", "lat": "33.77484", "lon": "-84.40254"},
            {"name": "WP58", "lat": "33.77504", "lon": "-84.40255"},
            {"name": "Stop2: WP03-C", "lat": "33.7751", "lon": "-84.40265"},
            {"name": "WP59", "lat": "33.77526", "lon": "-84.40253"},
            {"name": "WP60", "lat": "33.77546", "lon": "-84.40252"},
            {"name": "WP61", "lat": "33.77565", "lon": "-84.4025"},
            {"name": "WP62", "lat": "33.77581", "lon": "-84.40258"},
            {"name": "WP63", "lat": "33.77595", "lon": "-84.40247"},
            {"name": "WP64", "lat": "33.77614", "lon": "-84.40254"},
            {"name": "WP65", "lat": "33.77624", "lon": "-84.40245"},
            {"name": "WP66", "lat": "33.77648", "lon": "-84.40252"},
            {"name": "WP67", "lat": "33.77659", "lon": "-84.40242"},
            {"name": "WP68", "lat": "33.7768", "lon": "-84.40249"},
            {"name": "WP69", "lat": "33.7769", "lon": "-84.40239"},
            {"name": "WP70", "lat": "33.77708", "lon": "-84.40247"},
            {"name": "WP71", "lat": "33.77717", "lon": "-84.40239"},
            {"name": "WP72", "lat": "33.77733", "lon": "-84.40246"},
            {"name": "WP73", "lat": "33.77743", "lon": "-84.40234"},
            {"name": "WP74", "lat": "33.77762", "lon": "-84.40226"},
            {"name": "WP75", "lat": "33.77774", "lon": "-84.40218"},
            {"name": "WP76", "lat": "33.77781", "lon": "-84.40211"},
            {"name": "WP77", "lat": "33.77789", "lon": "-84.40203"},
            {"name": "Stop3: WP02-B", "lat": "33.77796", "lon": "-84.40201"},
            {"name": "WP78", "lat": "33.77798", "lon": "-84.40189"},
            {"name": "WP79", "lat": "33.77803", "lon": "-84.40181"},
            {"name": "WP80", "lat": "33.77807", "lon": "-84.40174"},
            {"name": "WP81", "lat": "33.77811", "lon": "-84.40166"},
            {"name": "WP82", "lat": "33.77817", "lon": "-84.40158"},
            {"name": "WP83", "lat": "33.77823", "lon": "-84.40151"},
            {"name": "WP84", "lat": "33.77827", "lon": "-84.40144"},
            {"name": "WP85", "lat": "33.77831", "lon": "-84.40137"},
            {"name": "WP86", "lat": "33.77835", "lon": "-84.40129"},
            {"name": "WP87", "lat": "33.77839", "lon": "-84.40122"},
            {"name": "WP88", "lat": "33.7784", "lon": "-84.40115"},
            {"name": "WP89", "lat": "33.77842", "lon": "-84.40105"},
            {"name": "WP90", "lat": "33.77844", "lon": "-84.40097"},
            {"name": "WP91", "lat": "33.77845", "lon": "-84.40088"},
            {"name": "WP92", "lat": "33.77845", "lon": "-84.40078"},
            {"name": "WP93", "lat": "33.77845", "lon": "-84.40067"},
            {"name": "WP94", "lat": "33.77845", "lon": "-84.40058"},
            {"name": "WP95", "lat": "33.77844", "lon": "-84.40049"},
            {"name": "WP96", "lat": "33.77844", "lon": "-84.4004"},
            {"name": "WP97", "lat": "33.77843", "lon": "-84.40032"},
            {"name": "WP98", "lat": "33.77841", "lon": "-84.40025"},
            {"name": "WP99", "lat": "33.7784", "lon": "-84.40018"},
            {"name": "WP100", "lat": "33.7784", "lon": "-84.40013"},
            {"name": "WP101", "lat": "33.77838", "lon": "-84.40006"},
            {"name": "WP102", "lat": "33.77837", "lon": "-84.4"},
            {"name": "WP103", "lat": "33.77835", "lon": "-84.39992"},
            {"name": "WP104", "lat": "33.77835", "lon": "-84.39987"},
            {"name": "WP105", "lat": "33.77833", "lon": "-84.39981"},
            {"name": "WP106", "lat": "33.77832", "lon": "-84.39975"},
            {"name": "WP107", "lat": "33.7783", "lon": "-84.39968"},
            {"name": "WP108", "lat": "33.77829", "lon": "-84.39963"},
            {"name": "Stop4: WP01-A", "lat": "33.77836", "lon": "-84.39956"},
            {"name": "WP109", "lat": "33.7783", "lon": "-84.39945"},
            {"name": "WP110", "lat": "33.77828", "lon": "-84.3993"},
            {"name": "WP111", "lat": "33.77832", "lon": "-84.39913"},
            {"name": "WP112", "lat": "33.77871", "lon": "-84.39912"},
            {"name": "WP113", "lat": "33.77899", "lon": "-84.39926"},
            {"name": "WP114", "lat": "33.77912", "lon": "-84.39909"},
            {"name": "WP115", "lat": "33.7795", "lon": "-84.39905"},
            {"name": "WP116", "lat": "33.77988", "lon": "-84.39902"},
            {"name": "WP117", "lat": "33.78009", "lon": "-84.39907"},
            {"name": "Stop5: WP09-I", "lat": "33.78021", "lon": "-84.39901"},
            {"name": "WP118", "lat": "33.78035", "lon": "-84.3991"},
            {"name": "WP119", "lat": "33.78054", "lon": "-84.39912"},
            {"name": "WP120", "lat": "33.78073", "lon": "-84.39912"},
            {"name": "WP121", "lat": "33.78093", "lon": "-84.39913"},
            {"name": "WP122", "lat": "33.78113", "lon": "-84.39912"},
            {"name": "WP123", "lat": "33.78133", "lon": "-84.39913"},
            {"name": "WP124", "lat": "33.78153", "lon": "-84.39916"},
            {"name": "WP125", "lat": "33.78155", "lon": "-84.39925"},
            {"name": "WP126", "lat": "33.78154", "lon": "-84.39932"},
            {"name": "WP127", "lat": "33.78154", "lon": "-84.39936"},
            {"name": "WP128", "lat": "33.78154", "lon": "-84.39942"},
            {"name": "WP129", "lat": "33.78154", "lon": "-84.39948"},
            {"name": "WP130", "lat": "33.78154", "lon": "-84.39952"},
            {"name": "WP131", "lat": "33.78154", "lon": "-84.39958"},
            {"name": "WP132", "lat": "33.78153", "lon": "-84.39965"},
            {"name": "WP133", "lat": "33.78154", "lon": "-84.39972"},
            {"name": "WP134", "lat": "33.78154", "lon": "-84.39979"},
            {"name": "WP135", "lat": "33.78154", "lon": "-84.39984"},
            {"name": "WP136", "lat": "33.78154", "lon": "-84.3999"},
            {"name": "WP137", "lat": "33.78154", "lon": "-84.39999"},
            {"name": "WP138", "lat": "33.78154", "lon": "-84.40004"},
            {"name": "WP139", "lat": "33.78154", "lon": "-84.4001"},
            {"name": "WP140", "lat": "33.78154", "lon": "-84.40016"},
            {"name": "WP141", "lat": "33.78154", "lon": "-84.40023"},
            {"name": "WP142", "lat": "33.78154", "lon": "-84.40027"},
            {"name": "WP143", "lat": "33.78154", "lon": "-84.40034"},
            {"name": "WP144", "lat": "33.78154", "lon": "-84.40041"},
            {"name": "WP145", "lat": "33.78154", "lon": "-84.40046"},
            {"name": "WP146", "lat": "33.78154", "lon": "-84.40051"},
            {"name": "WP147", "lat": "33.78154", "lon": "-84.40058"},
            {"name": "WP148", "lat": "33.78154", "lon": "-84.40067"},
            {"name": "WP149", "lat": "33.78154", "lon": "-84.40074"},
            {"name": "WP150", "lat": "33.78154", "lon": "-84.40082"},
            {"name": "WP151", "lat": "33.78154", "lon": "-84.40094"},
            {"name": "WP152", "lat": "33.78154", "lon": "-84.40102"},
            {"name": "WP153", "lat": "33.78154", "lon": "-84.40113"},
            {"name": "WP154", "lat": "33.78154", "lon": "-84.40122"},
            {"name": "WP155", "lat": "33.78154", "lon": "-84.40132"},
            {"name": "WP156", "lat": "33.78154", "lon": "-84.40141"},
            {"name": "WP157", "lat": "33.78155", "lon": "-84.40151"},
            {"name": "WP158", "lat": "33.78155", "lon": "-84.4016"},
            {"name": "WP159", "lat": "33.78155", "lon": "-84.40168"},
            {"name": "WP160", "lat": "33.78155", "lon": "-84.40178"},
            {"name": "WP161", "lat": "33.78155", "lon": "-84.40184"},
            {"name": "WP162", "lat": "33.78155", "lon": "-84.40193"},
            {"name": "WP163", "lat": "33.78155", "lon": "-84.40202"},
            {"name": "WP164", "lat": "33.78155", "lon": "-84.40209"},
            {"name": "WP165", "lat": "33.78155", "lon": "-84.40218"},
            {"name": "WP166", "lat": "33.78156", "lon": "-84.40227"},
            {"name": "WP167", "lat": "33.78156", "lon": "-84.40235"},
            {"name": "WP168", "lat": "33.78155", "lon": "-84.40241"},
            {"name": "WP169", "lat": "33.78155", "lon": "-84.40245"},
            {"name": "WP170", "lat": "33.78155", "lon": "-84.40253"},
            {"name": "WP171", "lat": "33.78155", "lon": "-84.40262"},
            {"name": "WP172", "lat": "33.78155", "lon": "-84.40273"},
            {"name": "WP173", "lat": "33.78155", "lon": "-84.40284"},
            {"name": "WP174", "lat": "33.78155", "lon": "-84.40295"},
            {"name": "WP175", "lat": "33.78155", "lon": "-84.40306"},
            {"name": "WP176", "lat": "33.78156", "lon": "-84.40321"},
            {"name": "WP177", "lat": "33.78156", "lon": "-84.40332"},
            {"name": "WP178", "lat": "33.78157", "lon": "-84.40345"},
            {"name": "WP179", "lat": "33.78158", "lon": "-84.40359"},
            {"name": "WP180", "lat": "33.78158", "lon": "-84.4037"},
            {"name": "WP181", "lat": "33.78158", "lon": "-84.40379"},
            {"name": "WP182", "lat": "33.78158", "lon": "-84.40386"},
            {"name": "WP183", "lat": "33.78158", "lon": "-84.40393"},
            {"name": "WP184", "lat": "33.78158", "lon": "-84.40398"},
            {"name": "WP185", "lat": "33.78158", "lon": "-84.40402"},
            {"name": "Stop6: WP10-J", "lat": "33.78162", "lon": "-84.40408"},
            {"name": "WP186", "lat": "33.78159", "lon": "-84.40416"},
            {"name": "WP187", "lat": "33.78183", "lon": "-84.40433"},
            {"name": "WP188", "lat": "33.78212", "lon": "-84.40448"},
            {"name": "WP189", "lat": "33.78243", "lon": "-84.40464"},
            {"name": "WP190", "lat": "33.78268", "lon": "-84.4048"},
            {"name": "WP191", "lat": "33.78293", "lon": "-84.40495"},
            {"name": "WP192", "lat": "33.7832", "lon": "-84.40511"},
            {"name": "WP193", "lat": "33.78343", "lon": "-84.40525"},
            {"name": "WP194", "lat": "33.78372", "lon": "-84.40542"},
            {"name": "WP195", "lat": "33.78398", "lon": "-84.40558"},
            {"name": "WP196", "lat": "33.78415", "lon": "-84.40572"},
            {"name": "Stop7: WP11-K", "lat": "33.78432", "lon": "-84.40574"},
            {"name": "WP197", "lat": "33.78456", "lon": "-84.40592"},
            {"name": "WP198", "lat": "33.78479", "lon": "-84.40606"},
            {"name": "WP199", "lat": "33.78517", "lon": "-84.40604"},
            {"name": "WP200", "lat": "33.78555", "lon": "-84.40603"},
            {"name": "WP201", "lat": "33.78594", "lon": "-84.40603"},
            {"name": "WP202", "lat": "33.78617", "lon": "-84.40582"},
            {"name": "WP203", "lat": "33.78617", "lon": "-84.40564"},
            {"name": "WP204", "lat": "33.78617", "lon": "-84.40546"},
            {"name": "WP205", "lat": "33.78621", "lon": "-84.40529"},
            {"name": "WP206", "lat": "33.78639", "lon": "-84.4051"},
            {"name": "WP207", "lat": "33.78695", "lon": "-84.40516"},
            {"name": "WP208", "lat": "33.78688", "lon": "-84.40526"},
            {"name": "WP209", "lat": "33.78676", "lon": "-84.40526"},
            {"name": "Stop8: WP05-E", "lat": "33.78637", "lon": "-84.40532"},
            {"name": "WP210", "lat": "33.78627", "lon": "-84.40504"},
            {"name": "WP211", "lat": "33.78628", "lon": "-84.40488"},
            {"name": "WP212", "lat": "33.78629", "lon": "-84.4047"},
            {"name": "WP213", "lat": "33.78627", "lon": "-84.40454"},
            {"name": "WP214", "lat": "33.7863", "lon": "-84.40435"},
            {"name": "WP215", "lat": "33.78629", "lon": "-84.4042"},
            {"name": "WP216", "lat": "33.78631", "lon": "-84.40406"},
            {"name": "WP217", "lat": "33.78632", "lon": "-84.40391"},
            {"name": "WP218", "lat": "33.7863", "lon": "-84.40375"},
            {"name": "WP219", "lat": "33.7863", "lon": "-84.40355"},
            {"name": "WP220", "lat": "33.78628", "lon": "-84.40335"},
            {"name": "WP221", "lat": "33.78628", "lon": "-84.40317"},
            {"name": "WP222", "lat": "33.78628", "lon": "-84.40298"},
            {"name": "WP223", "lat": "33.78628", "lon": "-84.40278"},
            {"name": "WP224", "lat": "33.78628", "lon": "-84.40262"},
            {"name": "WP225", "lat": "33.78628", "lon": "-84.40249"},
            {"name": "WP226", "lat": "33.78628", "lon": "-84.40233"},
            {"name": "WP227", "lat": "33.78628", "lon": "-84.40218"},
            {"name": "WP228", "lat": "33.78625", "lon": "-84.40201"},
            {"name": "WP229", "lat": "33.78625", "lon": "-84.40183"},
            {"name": "WP230", "lat": "33.78625", "lon": "-84.40164"},
            {"name": "WP231", "lat": "33.78625", "lon": "-84.40154"},
            {"name": "WP232", "lat": "33.78628", "lon": "-84.4014"},
            {"name": "WP233", "lat": "33.78627", "lon": "-84.40122"},
            {"name": "WP234", "lat": "33.78627", "lon": "-84.40106"},
            {"name": "WP235", "lat": "33.78626", "lon": "-84.40095"},
            {"name": "WP236", "lat": "33.78626", "lon": "-84.40074"},
            {"name": "WP237", "lat": "33.78627", "lon": "-84.40047"},
            {"name": "WP238", "lat": "33.78625", "lon": "-84.40039"},
            {"name": "WP239", "lat": "33.78626", "lon": "-84.40023"},
            {"name": "WP240", "lat": "33.78626", "lon": "-84.40004"},
            {"name": "WP241", "lat": "33.78625", "lon": "-84.39985"},
            {"name": "WP242", "lat": "33.78623", "lon": "-84.39963"},
            {"name": "WP243", "lat": "33.78623", "lon": "-84.39941"},
            {"name": "WP244", "lat": "33.78623", "lon": "-84.3992"},
            {"name": "WP245", "lat": "33.78623", "lon": "-84.399"},
            {"name": "Stop9: WP06-F", "lat": "33.78613", "lon": "-84.3988"},
            {"name": "WP246", "lat": "33.78625", "lon": "-84.39862"},
            {"name": "WP247", "lat": "33.78624", "lon": "-84.39846"},
            {"name": "WP248", "lat": "33.78624", "lon": "-84.39826"},
            {"name": "WP249", "lat": "33.78624", "lon": "-84.39809"},
            {"name": "WP250", "lat": "33.78625", "lon": "-84.3979"},
            {"name": "WP251", "lat": "33.78624", "lon": "-84.39773"},
            {"name": "WP252", "lat": "33.78623", "lon": "-84.39754"},
            {"name": "WP253", "lat": "33.78626", "lon": "-84.39735"},
            {"name": "WP254", "lat": "33.78628", "lon": "-84.39713"},
            {"name": "WP255", "lat": "33.78628", "lon": "-84.39702"},
            {"name": "WP256", "lat": "33.7863", "lon": "-84.3968"},
            {"name": "WP257", "lat": "33.78633", "lon": "-84.39665"},
            {"name": "WP258", "lat": "33.78634", "lon": "-84.39646"},
            {"name": "WP259", "lat": "33.78637", "lon": "-84.39629"},
            {"name": "WP260", "lat": "33.78637", "lon": "-84.39612"},
            {"name": "WP261", "lat": "33.78637", "lon": "-84.39604"},
            {"name": "WP262", "lat": "33.78641", "lon": "-84.39586"},
            {"name": "Stop10: WP07-G", "lat": "33.78628", "lon": "-84.39559"},
            {"name": "WP263", "lat": "33.78643", "lon": "-84.3954"},
            {"name": "WP264", "lat": "33.78647", "lon": "-84.39522"},
            {"name": "WP265", "lat": "33.7865", "lon": "-84.39506"},
            {"name": "WP266", "lat": "33.7865", "lon": "-84.3949"},
            {"name": "WP267", "lat": "33.78653", "lon": "-84.39471"},
            {"name": "WP268", "lat": "33.78655", "lon": "-84.39453"},
            {"name": "WP269", "lat": "33.78656", "lon": "-84.39438"},
            {"name": "WP270", "lat": "33.78656", "lon": "-84.3942"},
            {"name": "WP271", "lat": "33.78659", "lon": "-84.39403"},
            {"name": "WP272", "lat": "33.78661", "lon": "-84.39384"},
            {"name": "WP273", "lat": "33.78662", "lon": "-84.39366"},
            {"name": "WP274", "lat": "33.78664", "lon": "-84.39348"},
            {"name": "WP275", "lat": "33.78664", "lon": "-84.39333"},
            {"name": "WP276", "lat": "33.78656", "lon": "-84.39313"},
            {"name": "WP277", "lat": "33.78656", "lon": "-84.39299"},
            {"name": "WP278", "lat": "33.78656", "lon": "-84.39277"},
            {"name": "WP279", "lat": "33.78655", "lon": "-84.39246"},
            {"name": "WP280", "lat": "33.78657", "lon": "-84.39222"},
            {"name": "WP281", "lat": "33.78659", "lon": "-84.39205"},
            {"name": "WP282", "lat": "33.78639", "lon": "-84.39202"},
            {"name": "WP283", "lat": "33.78628", "lon": "-84.39202"},
            {"name": "WP284", "lat": "33.78617", "lon": "-84.39203"},
            {"name": "WP285", "lat": "33.78609", "lon": "-84.39202"},
            {"name": "WP286", "lat": "33.78598", "lon": "-84.39201"},
            {"name": "WP287", "lat": "33.78589", "lon": "-84.39201"},
            {"name": "WP288", "lat": "33.78582", "lon": "-84.39201"},
            {"name": "WP289", "lat": "33.7857", "lon": "-84.39198"},
            {"name": "WP290", "lat": "33.78558", "lon": "-84.392"},
            {"name": "WP291", "lat": "33.78546", "lon": "-84.392"},
            {"name": "WP292", "lat": "33.78536", "lon": "-84.39202"},
            {"name": "WP293", "lat": "33.78522", "lon": "-84.39202"},
            {"name": "WP294", "lat": "33.78514", "lon": "-84.39201"},
            {"name": "WP295", "lat": "33.78502", "lon": "-84.39201"},
            {"name": "WP296", "lat": "33.78491", "lon": "-84.39201"},
            {"name": "WP297", "lat": "33.7848", "lon": "-84.39202"},
            {"name": "WP298", "lat": "33.78464", "lon": "-84.39201"},
            {"name": "WP299", "lat": "33.78451", "lon": "-84.39201"},
            {"name": "WP300", "lat": "33.78436", "lon": "-84.39201"},
            {"name": "WP301", "lat": "33.78423", "lon": "-84.39201"},
            {"name": "WP302", "lat": "33.78408", "lon": "-84.39201"},
            {"name": "WP303", "lat": "33.78398", "lon": "-84.39202"},
            {"name": "WP304", "lat": "33.78385", "lon": "-84.39202"},
            {"name": "WP305", "lat": "33.78369", "lon": "-84.39204"},
            {"name": "WP306", "lat": "33.7836", "lon": "-84.39204"},
            {"name": "WP307", "lat": "33.78345", "lon": "-84.39205"},
            {"name": "WP308", "lat": "33.78333", "lon": "-84.39203"},
            {"name": "WP309", "lat": "33.7832", "lon": "-84.39203"},
            {"name": "WP310", "lat": "33.783", "lon": "-84.39202"},
            {"name": "WP311", "lat": "33.7829", "lon": "-84.39199"},
            {"name": "WP312", "lat": "33.78279", "lon": "-84.39199"},
            {"name": "WP313", "lat": "33.78269", "lon": "-84.39199"},
            {"name": "WP314", "lat": "33.78261", "lon": "-84.39199"},
            {"name": "WP315", "lat": "33.78251", "lon": "-84.39198"},
            {"name": "WP316", "lat": "33.78242", "lon": "-84.39197"},
            {"name": "WP317", "lat": "33.78229", "lon": "-84.39199"},
            {"name": "WP318", "lat": "33.7822", "lon": "-84.39198"},
            {"name": "WP319", "lat": "33.78206", "lon": "-84.39199"},
            {"name": "WP320", "lat": "33.7819", "lon": "-84.39199"},
            {"name": "WP321", "lat": "33.78182", "lon": "-84.392"},
            {"name": "WP322", "lat": "33.78175", "lon": "-84.39199"},
            {"name": "WP323", "lat": "33.7817", "lon": "-84.39199"},
            {"name": "WP324", "lat": "33.78163", "lon": "-84.39199"},
            {"name": "WP325", "lat": "33.78157", "lon": "-84.39199"},
            {"name": "WP326", "lat": "33.78155", "lon": "-84.3921"},
            {"name": "WP327", "lat": "33.78156", "lon": "-84.39222"},
            {"name": "WP328", "lat": "33.78157", "lon": "-84.39233"},
            {"name": "WP329", "lat": "33.78157", "lon": "-84.39244"},
            {"name": "WP330", "lat": "33.78158", "lon": "-84.39259"},
            {"name": "WP331", "lat": "33.78158", "lon": "-84.3927"},
            {"name": "WP332", "lat": "33.78157", "lon": "-84.39289"},
            {"name": "WP333", "lat": "33.78156", "lon": "-84.393"},
            {"name": "WP334", "lat": "33.78156", "lon": "-84.39314"},
            {"name": "WP335", "lat": "33.78156", "lon": "-84.39325"},
            {"name": "WP336", "lat": "33.78155", "lon": "-84.39334"},
            {"name": "WP337", "lat": "33.78155", "lon": "-84.39347"},
            {"name": "WP338", "lat": "33.78155", "lon": "-84.39363"},
            {"name": "WP339", "lat": "33.78155", "lon": "-84.39377"},
            {"name": "WP340", "lat": "33.78155", "lon": "-84.39392"},
            {"name": "WP341", "lat": "33.78155", "lon": "-84.39406"},
            {"name": "WP342", "lat": "33.78155", "lon": "-84.39415"},
            {"name": "WP343", "lat": "33.78155", "lon": "-84.3943"},
            {"name": "WP344", "lat": "33.78154", "lon": "-84.39441"},
            {"name": "WP345", "lat": "33.78154", "lon": "-84.39454"},
            {"name": "WP346", "lat": "33.78153", "lon": "-84.39467"},
            {"name": "WP347", "lat": "33.78155", "lon": "-84.39479"},
            {"name": "WP348", "lat": "33.78155", "lon": "-84.39493"},
            {"name": "WP349", "lat": "33.78155", "lon": "-84.39508"},
            {"name": "WP350", "lat": "33.78155", "lon": "-84.39522"},
            {"name": "WP351", "lat": "33.78155", "lon": "-84.39531"},
            {"name": "WP352", "lat": "33.78155", "lon": "-84.39544"},
            {"name": "WP353", "lat": "33.78155", "lon": "-84.39556"},
            {"name": "WP354", "lat": "33.78155", "lon": "-84.39565"},
            {"name": "WP355", "lat": "33.78155", "lon": "-84.39579"},
            {"name": "WP356", "lat": "33.78154", "lon": "-84.39591"},
            {"name": "WP357", "lat": "33.78154", "lon": "-84.396"},
            {"name": "WP358", "lat": "33.78155", "lon": "-84.39611"},
            {"name": "WP359", "lat": "33.78156", "lon": "-84.39623"},
            {"name": "WP360", "lat": "33.78155", "lon": "-84.39635"},
            {"name": "WP361", "lat": "33.78155", "lon": "-84.3965"},
            {"name": "WP362", "lat": "33.78155", "lon": "-84.39664"},
            {"name": "WP363", "lat": "33.78155", "lon": "-84.39675"},
            {"name": "WP364", "lat": "33.78155", "lon": "-84.39691"},
            {"name": "WP365", "lat": "33.78155", "lon": "-84.39703"},
            {"name": "WP366", "lat": "33.78156", "lon": "-84.39725"},
            {"name": "WP367", "lat": "33.78156", "lon": "-84.39744"},
            {"name": "WP368", "lat": "33.78154", "lon": "-84.39757"},
            {"name": "WP369", "lat": "33.78155", "lon": "-84.39767"},
            {"name": "WP370", "lat": "33.78154", "lon": "-84.39781"},
            {"name": "WP371", "lat": "33.78154", "lon": "-84.39789"},
            {"name": "WP372", "lat": "33.78154", "lon": "-84.39806"},
            {"name": "WP373", "lat": "33.78154", "lon": "-84.39815"},
            {"name": "WP374", "lat": "33.78155", "lon": "-84.39826"},
            {"name": "WP375", "lat": "33.78155", "lon": "-84.39838"},
            {"name": "WP376", "lat": "33.78154", "lon": "-84.3985"},
            {"name": "WP377", "lat": "33.78155", "lon": "-84.39864"},
            {"name": "WP378", "lat": "33.78155", "lon": "-84.39878"},
            {"name": "WP379", "lat": "33.78156", "lon": "-84.39893"},
            {"name": "WP380", "lat": "33.78156", "lon": "-84.39903"},
            {"name": "WP381", "lat": "33.78153", "lon": "-84.39908"},
            {"name": "WP01-A", "lat": "33.78142", "lon": "-84.39916"},
            {"name": "WP02-B", "lat": "33.78135", "lon": "-84.39918"},
            {"name": "WP03-C", "lat": "33.78129", "lon": "-84.39917"},
            {"name": "WP04-D", "lat": "33.78122", "lon": "-84.39917"},
            {"name": "WP05-E", "lat": "33.78116", "lon": "-84.39918"},
            {"name": "WP06-F", "lat": "33.78107", "lon": "-84.39917"},
            {"name": "WP07-G", "lat": "33.78098", "lon": "-84.39917"},
            {"name": "WP08-H", "lat": "33.78088", "lon": "-84.39917"},
            {"name": "WP09-I", "lat": "33.78077", "lon": "-84.39916"},
            {"name": "WP10-J", "lat": "33.7807", "lon": "-84.39917"},
            {"name": "WP11-K", "lat": "33.78062", "lon": "-84.39916"},
            {"name": "WP12-L", "lat": "33.78053", "lon": "-84.39916"},
            {"name": "WP13-M", "lat": "33.78045", "lon": "-84.3992"},
            {"name": "Stop11: WP08-H", "lat": "33.78035", "lon": "-84.39923"},
            {"name": "WP14-N", "lat": "33.78028", "lon": "-84.39921"},
            {"name": "WP15-O", "lat": "33.7802", "lon": "-84.3992"},
            {"name": "WP16-P", "lat": "33.78012", "lon": "-84.39921"},
            {"name": "WP17-Q", "lat": "33.78003", "lon": "-84.39922"},
            {"name": "WP18-R", "lat": "33.77995", "lon": "-84.39921"},
            {"name": "WP19-S", "lat": "33.77983", "lon": "-84.39921"},
            {"name": "WP20-T", "lat": "33.77974", "lon": "-84.39921"},
            {"name": "WP21-U", "lat": "33.77965", "lon": "-84.39921"},
            {"name": "WP22-V", "lat": "33.7796", "lon": "-84.39921"},
            {"name": "WP23-W", "lat": "33.77953", "lon": "-84.39921"},
            {"name": "WP24-X", "lat": "33.77944", "lon": "-84.39921"},
            {"name": "WP25-Y", "lat": "33.77938", "lon": "-84.39922"},
            {"name": "WP26-Z", "lat": "33.77932", "lon": "-84.39922"},
            {"name": "WP27", "lat": "33.77925", "lon": "-84.39922"},
            {"name": "WP28", "lat": "33.77917", "lon": "-84.39923"},
            {"name": "WP29", "lat": "33.7791", "lon": "-84.39924"},
            {"name": "WP30", "lat": "33.77904", "lon": "-84.39924"},
            {"name": "WP31", "lat": "33.77895", "lon": "-84.39924"},
            {"name": "WP32", "lat": "33.7789", "lon": "-84.39924"},
            {"name": "WP33", "lat": "33.77883", "lon": "-84.39925"},
            {"name": "WP34", "lat": "33.77875", "lon": "-84.39925"},
            {"name": "WP35", "lat": "33.77868", "lon": "-84.39925"},
            {"name": "WP36", "lat": "33.7786", "lon": "-84.39925"},
            {"name": "WP37", "lat": "33.77851", "lon": "-84.39924"},
            {"name": "WP38", "lat": "33.77845", "lon": "-84.39924"},
            {"name": "WP39", "lat": "33.77838", "lon": "-84.39925"},
            {"name": "WP40", "lat": "33.77834", "lon": "-84.39921"},
            {"name": "WP41", "lat": "33.77831", "lon": "-84.39928"},
            {"name": "WP42", "lat": "33.77832", "lon": "-84.39938"},
            {"name": "WP43", "lat": "33.77832", "lon": "-84.39944"},
            {"name": "Stop12: WP01-A", "lat": "33.77836", "lon": "-84.39956"},
            {"name": "WP44", "lat": "33.77837", "lon": "-84.39969"},
            {"name": "WP45", "lat": "33.7784", "lon": "-84.39984"},
            {"name": "WP46", "lat": "33.77842", "lon": "-84.39995"},
            {"name": "WP47", "lat": "33.77844", "lon": "-84.40007"},
            {"name": "WP48", "lat": "33.77847", "lon": "-84.40019"},
            {"name": "WP49", "lat": "33.77849", "lon": "-84.40036"},
            {"name": "WP50", "lat": "33.77852", "lon": "-84.40048"},
            {"name": "WP51", "lat": "33.77853", "lon": "-84.40058"},
            {"name": "WP52", "lat": "33.77853", "lon": "-84.40074"},
            {"name": "WP53", "lat": "33.77851", "lon": "-84.40085"},
            {"name": "WP54", "lat": "33.7785", "lon": "-84.40101"},
            {"name": "WP55", "lat": "33.77848", "lon": "-84.40115"},
            {"name": "WP56", "lat": "33.77845", "lon": "-84.40123"},
            {"name": "WP57", "lat": "33.7784", "lon": "-84.40134"},
            {"name": "WP58", "lat": "33.77834", "lon": "-84.40149"},
            {"name": "WP59", "lat": "33.7783", "lon": "-84.40154"},
            {"name": "WP60", "lat": "33.77825", "lon": "-84.40162"},
            {"name": "WP61", "lat": "33.7782", "lon": "-84.40171"},
            {"name": "WP62", "lat": "33.77815", "lon": "-84.40178"},
            {"name": "WP63", "lat": "33.77809", "lon": "-84.40188"},
            {"name": "WP64", "lat": "33.77804", "lon": "-84.40194"},
            {"name": "Stop13: WP02-B", "lat": "33.77796", "lon": "-84.40201"},
            {"name": "WP65", "lat": "33.77794", "lon": "-84.40209"},
            {"name": "WP66", "lat": "33.77788", "lon": "-84.40216"},
            {"name": "WP67", "lat": "33.77779", "lon": "-84.40224"},
            {"name": "WP68", "lat": "33.7777", "lon": "-84.40231"},
            {"name": "WP69", "lat": "33.77761", "lon": "-84.40238"},
            {"name": "WP70", "lat": "33.77748", "lon": "-84.40241"},
            {"name": "WP71", "lat": "33.77735", "lon": "-84.40245"},
            {"name": "WP72", "lat": "33.77726", "lon": "-84.40246"},
            {"name": "WP73", "lat": "33.77713", "lon": "-84.40246"},
            {"name": "WP74", "lat": "33.77701", "lon": "-84.40248"},
            {"name": "WP75", "lat": "33.77691", "lon": "-84.40248"},
            {"name": "WP76", "lat": "33.77678", "lon": "-84.40249"},
            {"name": "WP77", "lat": "33.77666", "lon": "-84.4025"},
            {"name": "WP78", "lat": "33.77654", "lon": "-84.40251"},
            {"name": "WP79", "lat": "33.77644", "lon": "-84.40253"},
            {"name": "WP80", "lat": "33.77631", "lon": "-84.40252"},
            {"name": "WP81", "lat": "33.77621", "lon": "-84.40254"},
            {"name": "WP82", "lat": "33.77611", "lon": "-84.40254"},
            {"name": "WP83", "lat": "33.77601", "lon": "-84.40255"},
            {"name": "WP84", "lat": "33.77592", "lon": "-84.40255"},
            {"name": "WP85", "lat": "33.77583", "lon": "-84.40258"},
            {"name": "WP86", "lat": "33.7757", "lon": "-84.40259"},
            {"name": "WP87", "lat": "33.7756", "lon": "-84.40259"},
            {"name": "WP88", "lat": "33.77549", "lon": "-84.4026"},
            {"name": "WP89", "lat": "33.77539", "lon": "-84.40259"},
            {"name": "WP90", "lat": "33.7753", "lon": "-84.4026"},
            {"name": "WP91", "lat": "33.77521", "lon": "-84.40261"},
            {"name": "Stop14: WP03-C", "lat": "33.7751", "lon": "-84.40265"},
            {"name": "WP92", "lat": "33.77497", "lon": "-84.40264"},
            {"name": "WP93", "lat": "33.77488", "lon": "-84.40262"},
            {"name": "WP94", "lat": "33.77481", "lon": "-84.40262"},
            {"name": "WP95", "lat": "33.7747", "lon": "-84.4026"},
            {"name": "WP96", "lat": "33.77464", "lon": "-84.4026"},
            {"name": "WP97", "lat": "33.77456", "lon": "-84.40255"},
            {"name": "WP98", "lat": "33.77449", "lon": "-84.40255"},
            {"name": "WP99", "lat": "33.77443", "lon": "-84.40251"},
            {"name": "WP100", "lat": "33.77436", "lon": "-84.40246"},
            {"name": "WP101", "lat": "33.77431", "lon": "-84.40242"},
            {"name": "WP102", "lat": "33.77427", "lon": "-84.40236"},
            {"name": "WP103", "lat": "33.7742", "lon": "-84.40232"},
            {"name": "WP104", "lat": "33.77413", "lon": "-84.40229"},
            {"name": "WP105", "lat": "33.77407", "lon": "-84.40222"},
            {"name": "WP106", "lat": "33.77402", "lon": "-84.40214"},
            {"name": "WP107", "lat": "33.77396", "lon": "-84.40208"},
            {"name": "WP108", "lat": "33.77393", "lon": "-84.40202"},
            {"name": "WP109", "lat": "33.7739", "lon": "-84.40194"},
            {"name": "WP110", "lat": "33.77387", "lon": "-84.40186"},
            {"name": "WP111", "lat": "33.77384", "lon": "-84.40177"},
            {"name": "WP112", "lat": "33.77377", "lon": "-84.40165"},
            {"name": "WP113", "lat": "33.77375", "lon": "-84.40154"},
            {"name": "WP114", "lat": "33.77372", "lon": "-84.40143"},
            {"name": "WP115", "lat": "33.7737", "lon": "-84.40133"},
            {"name": "WP116", "lat": "33.77368", "lon": "-84.40117"},
            {"name": "WP117", "lat": "33.77367", "lon": "-84.40107"},
            {"name": "WP118", "lat": "33.77365", "lon": "-84.40098"},
            {"name": "WP119", "lat": "33.77363", "lon": "-84.40084"},
            {"name": "WP120", "lat": "33.77364", "lon": "-84.40073"},
            {"name": "WP121", "lat": "33.7736", "lon": "-84.40064"},
            {"name": "WP122", "lat": "33.77358", "lon": "-84.40055"},
            {"name": "WP123", "lat": "33.77357", "lon": "-84.40045"},
            {"name": "WP124", "lat": "33.77355", "lon": "-84.40033"},
            {"name": "WP125", "lat": "33.77353", "lon": "-84.40022"},
            {"name": "WP126", "lat": "33.77352", "lon": "-84.40011"},
            {"name": "WP127", "lat": "33.77348", "lon": "-84.39999"},
            {"name": "WP128", "lat": "33.77348", "lon": "-84.39985"},
            {"name": "WP129", "lat": "33.77347", "lon": "-84.39973"},
            {"name": "WP130", "lat": "33.77344", "lon": "-84.39965"},
            {"name": "WP131", "lat": "33.77343", "lon": "-84.39952"},
            {"name": "WP132", "lat": "33.77341", "lon": "-84.3994"},
            {"name": "WP133", "lat": "33.77339", "lon": "-84.39932"},
            {"name": "Stop15: WP04-D", "lat": "33.77335", "lon": "-84.39917"},
            {"name": "WP134", "lat": "33.77335", "lon": "-84.39909"},
            {"name": "WP135", "lat": "33.77333", "lon": "-84.39899"},
            {"name": "WP136", "lat": "33.7733", "lon": "-84.39886"},
            {"name": "WP137", "lat": "33.77328", "lon": "-84.39873"},
            {"name": "WP138", "lat": "33.77326", "lon": "-84.39859"},
            {"name": "WP139", "lat": "33.77326", "lon": "-84.39846"},
            {"name": "WP140", "lat": "33.77322", "lon": "-84.39833"},
            {"name": "WP141", "lat": "33.7732", "lon": "-84.3982"},
            {"name": "WP142", "lat": "33.77317", "lon": "-84.39806"},
            {"name": "WP143", "lat": "33.77314", "lon": "-84.39793"},
            {"name": "WP144", "lat": "33.7731", "lon": "-84.39781"},
            {"name": "WP145", "lat": "33.77306", "lon": "-84.39771"},
            {"name": "WP146", "lat": "33.77302", "lon": "-84.39761"},
            {"name": "WP147", "lat": "33.77295", "lon": "-84.39751"},
            {"name": "WP148", "lat": "33.7729", "lon": "-84.39742"},
            {"name": "WP149", "lat": "33.77286", "lon": "-84.39734"},
            {"name": "WP150", "lat": "33.77278", "lon": "-84.39725"},
            {"name": "WP151", "lat": "33.77286", "lon": "-84.39712"},
            {"name": "WP152", "lat": "33.77299", "lon": "-84.39703"},
            {"name": "WP153", "lat": "33.77319", "lon": "-84.39698"},
            {"name": "Stop16: WP12-L", "lat": "33.77325", "lon": "-84.39701"},
        ]
    }