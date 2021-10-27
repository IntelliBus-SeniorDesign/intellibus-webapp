// Wait until window is fully loaded to load canvas.js
window.onload = (event) => {
  console.log('page is fully loaded');

  // Define our data inputs and formatting
  const dataInputs = 
  {
    'Bus1':
    {
      label: 'Bus1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
    },
    'Bus2':
    {
      label: 'Bus2',
      backgroundColor: 'rgb(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
    },
    'Bus3':
    {
      label: 'Bus3',
      backgroundColor: 'rgb(255, 206, 86)',
      borderColor: 'rgb(255, 206, 86)',
    },
    'Bus4':
    {
      label: 'Bus4',
      backgroundColor: 'rgb(75, 192, 192)',
      borderColor: 'rgb(75, 192, 192)',
    },
    'Route1':
    {
      label: 'Route1',
      backgroundColor: 'rgb(153, 102, 255)',
      borderColor: 'rgb(153, 102, 255)',
    },
    'Route2':
    {
      label: 'Route2',
      backgroundColor: 'rgb(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
    },
    'Route3':
    {
      label: 'Route3',
      backgroundColor: 'rgb(45, 159, 64)',
      borderColor: 'rgb(45, 159, 64)',
    },
    'Route4':
    {
      label: 'Route4',
      backgroundColor: 'rgb(255, 255, 255)',
      borderColor: 'rgb(255, 255, 255)',
    },
  }

  // Test canvas js
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'Bus1',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: 'Bus2',
      backgroundColor: 'rgba(75, 192, 192)',
      borderColor: 'rgba(75, 192, 192)',
      data: [0, 22, 53, 2, 5, 15, 23],
    }
  ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const passengerTimeChart = new Chart(
    document.getElementById('passengers-vs-time'),
    config
  );
};