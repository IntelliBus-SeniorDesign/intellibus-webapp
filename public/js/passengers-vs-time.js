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
};