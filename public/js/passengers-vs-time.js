const mockDataset = require('../assets/simulation/passengers-vs-time.json');

// Wait until window is fully loaded to load canvas.js
window.onload = (event) => {
  ///////////////////////////////////////////////////////////////////////
  ///                           DEFINING GLOBALS
  ///////////////////////////////////////////////////////////////////////
  let analyticsBusesDeployed = 0;
  let analyticsPassengerCount = 0;
  let analyticsAveragePassengers = 0;

  // Define our data inputs and formatting
  
  const dataInputs = 
  {
    Bus1:
    {
      label: 'Bus1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: []
    },
    Bus2:
    {
      label: 'Bus2',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
      data: []
    },
    Bus3:
    {
      label: 'Bus3',
      backgroundColor: 'rgb(255, 206, 86)',
      borderColor: 'rgb(255, 206, 86)',
      data: []
    },
    Bus4:
    {
      label: 'Bus4',
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgb(75, 192, 192)',
      data: []
    },
    Route1:
    {
      label: 'Route1',
      backgroundColor: 'rgb(153, 102, 255)',
      borderColor: 'rgb(153, 102, 255)',
      data: []
    },
    Route2:
    {
      label: 'Route2',
      backgroundColor: 'rgb(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
      data: []
    },
    Route3:
    {
      label: 'Route3',
      backgroundColor: 'rgb(45, 159, 64)',
      borderColor: 'rgb(45, 159, 64)',
      data: []
    },
    Route4:
    {
      label: 'Route4',
      backgroundColor: 'rgb(4, 3, 100)',
      borderColor: 'rgb(4, 3, 100)',
      data: []
    },
  }

  ///////////////////////////////////////////////////////////////////////
  ///                           DEFINE Chart-js PARAMS
  ///////////////////////////////////////////////////////////////////////

  const labels = [];

  // Populate labels, data
  console.log("Populating dataset", mockDataset);
  
  for (let date of Object.keys(mockDataset)) {
    // get data per time value
    for (let time of Object.keys(mockDataset[date])) {

      // populate 'labels', the axis markers
      let label = [date, time];
      labels.push(label);

      //push value for each key in dataInputs[]
      for (let dataId of Object.keys(dataInputs)) {
        let dataForId = mockDataset[date][time][dataId];
        
        // console.log('Adding value', dataForId, 'for', dataId);
        dataInputs[dataId]['data'].push(dataForId);
      }
    }
  }


  /// other chart
  const testLabels = [
    ['12/6/2021', '8:00'],
    ['12/6/2021', '9:00'],
    ['12/6/2021', '10:00'],
    ['12/6/2021', '11:00'],
    ['12/6/2021', '12:00'],
    ['12/6/2021', '13:00'],
    ['12/6/2021', '14:00'],
    ['12/6/2021', '15:00'],
    ['12/6/2021', '16:00']
];
  const testdata = {
    labels: testLabels,
    datasets: [{
      label: 'Bus1',
      data: [0.03, 0.75, 0.2, -0.3, -0.4, 0.2, -0.3, 0.15, -0.3],
      backgroundColor: [
        'rgba(34, 139, 34, 0.4)',
        'rgba(34, 139, 34, 0.4)',
        'rgba(34, 139, 34, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(34, 139, 34, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(34, 139, 34, 0.4)',
        'rgba(255, 99, 132, 0.4)',
      ],
      borderColor: [
        'rgba(34, 139, 34)',
        'rgba(34, 139, 34)',
        'rgba(34, 139, 34)',
        'rgb(255, 99, 132)',
        'rgb(255, 99, 132)',
        'rgba(34, 139, 34)',
        'rgb(255, 99, 132)',
        'rgba(34, 139, 34)',
        'rgb(255, 99, 132)',
      ],
      borderWidth: 1,
    }]
  }
  const testconfig = {
    type: 'bar',
    data: testdata,
    options: {
      plugins: {
        title: {
          display: true,
          text: '% Change in Capacity vs. Time',
          padding: 20,
          font: {
            size: 24
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            padding: 30
          }
        },
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  ///////////////////////////////////////////////////////////////////////
  ///                           CREATE CHART
  ///////////////////////////////////////////////////////////////////////
  const data = {
    labels: labels,
    datasets: 
      (function() {
        let sets = [];
        for (let key of Object.keys(dataInputs))
        {
          sets.push(dataInputs[key]);
          console.log(sets);
        }

        return sets;
      })()
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Passengers vs. Time',
          padding: 20,
          font: {
            size: 24
          }
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            padding: 30
          }
        }
      }
    }
  };

  const passengerTimeChart = new Chart(
    document.getElementById('passengers-vs-time'),
    config
  );
  const testpassengerTimeChart = new Chart(
    document.getElementById('weight-passengers-vs-time'),
    testconfig
  );
};



fetch("https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/deviceinfo")
.then (response => response.json())
.then (function(data) {
  data = data.body;

  // Iterate through the body and update the variables
  data.forEach(element => {
    let id = element.deviceID;
    let lastCheckIn = element.lastCheckIn;
    let deviceType = element.deviceType;
    let battery = element.battery;

    let html = document.getElementById(id + 'deviceID');
    html.innerHTML = id;
    html = document.getElementById(id + 'lastCheckIn'); 
    if (lastCheckIn)
      html.innerHTML = new Date(lastCheckIn);
    else 
      html.innerHTML = "NULL"
    html = document.getElementById(id + 'deviceType');
    html.innerHTML = deviceType;
    html = document.getElementById(id + 'battery');
    html.innerHTML = battery;
  });
})


let count = 217;
let countHtml = document.getElementById('analytics-passenger-count');
countHtml.innerHTML = count;

let apc_nextIterator;
async function initializeShardIterators() {
  /// APC Route iterator
  let apc_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_IoTTestUnitStream/sharditerator?shard-id=shardId-000000000000');
  let apc_json = await apc_response.json();
  apc_nextIterator = apc_json.ShardIterator;
  console.log ('Init APC Shard Iterator', apc_nextIterator);

  return true; 
}

async function getAPCRecords() {
  let apc_response;
  // GET apc records until Records is not empty
  apc_timer = setInterval(async function() {
    apc_response = await fetch('https://kdij4yod85.execute-api.us-east-2.amazonaws.com/dev/streams/dev_IoTTestUnitStream/records', {
      mode: 'cors',
      headers: {
        "Shard-Iterator": apc_nextIterator
      }});
      // convert response to a readable format
      apc_response = await apc_response.json();
      console.log('GET apc records', apc_response);

    // Now evaluate if the response has an empty record or not
    if (apc_response) {
      if (apc_response.Records.length > 0) {
        // Set the next iterator value and the record value
        let data = apc_response.Records[0].Data;
        apc_nextIterator = apc_response.NextShardIterator;
        
        clearInterval(apc_timer);
        
        // Convert the response to something meaningful
        let decoded = JSON.parse(atob(data));
        console.warn('record obtained for apc', decoded);

        // Create a new feature if not exist, else update its information
        if (!apcDevBusFeature) {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = decoded.stop_move ? 'Loading passengers' : 'Moving';
          greenDevBusFeature = new Feature({
            geometry: new Point(busCoord)
          });
          greenDevBusFeature.setStyle(new Style({ 
            image: new Icon({
            src: busIcon
          })}));
          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });

          // Add the feature to our vector layer
          BusStopSource.addFeature(apcDevBusFeature);
        }
        // Update location and props
        else {
          let entity = "bus";
          let busId = decoded.deviceID
          let nextStop = decoded.wp_name;
          let capacity = decoded.total_passengers;
          let busCoord = fromLonLat([decoded.coordinate[1], decoded.coordinate[0]]);
          let status = function() {
            if (decoded.stop_move) {
              return 'Loading passengers';
            }
            else {
              return 'Moving';
            }
          }
          greenDevBusFeature.getGeometry().setCoordinates(busCoord);
            
        
          // reset the HUD overlay if focused on the bus
        if(overlay.getPosition() && header.innerHTML.includes("BUS " + busId)) overlay.setPosition(busCoord);

          greenDevBusFeature.setProperties({
            "entity": entity,
            "busId": busId || '',
            "nextStop": nextStop || '',
            "capacity": capacity || '0',
            "lat": (decoded.coordinate[0])|| '',
            "lon": (decoded.coordinate[1]) || '',
            "status": status
          });
        }
        
        // fire a select event
        selectClick.set('features', new Collection([apcDevBusFeature]));
        selectClick.dispatchEvent('select');

        // Iterate for next shards
        getAPCRecords();
      }
    }
  }, 2000);
}