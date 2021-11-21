// Wait until window is fully loaded to load canvas.js
window.onload = (event) => {
  ///////////////////////////////////////////////////////////////////////
  ///                           DEFINING GLOBALS
  ///////////////////////////////////////////////////////////////////////
  let analyticsBusesDeployed = 0;
  let analyticsPassengerCount = 0;
  let analyticsAveragePassengers = 0;

  // Define our data inputs and formatting
  const testLabels = ['1', '2', '3'];
  //const data = [0.03, 0.75, -0.60,]
  const data = {
    labels: testLabels,
    datasets: [{
      label: 'Percent change in Max capacity vs. Time',
      data: [0.03, 0.75, -0.60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
      ],
      borderWidth: 1,
    }]
  }

  ///////////////////////////////////////////////////////////////////////
  ///                           DEFINE Chart-js PARAMS
  ///////////////////////////////////////////////////////////////////////

  let label = 'Dataset';

  
  /*for (let date of Object.keys(mockDataset)) {
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
    }*/
  
  ///////////////////////////////////////////////////////////////////////
  ///                           CREATE CHART
  ///////////////////////////////////////////////////////////////////////
  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Percent Change vs. Max Capacity vs. Time',
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

  const passengerTimeChart = new Chart(
    document.getElementById('weight-passengers-vs-time'),
    config
  );
};