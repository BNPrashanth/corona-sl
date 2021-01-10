import React from 'react';
import { Grid } from '@material-ui/core';
import { Line } from 'react-chartjs-2';


class RecoveryChart extends React.Component {
  render() {
    const { data } = this.props;

    const dates = data.map(item => item.date);
    const confirmed = data.map(item => item.confirmed);
    const deaths = data.map(item => item.deaths);
    const recovered = data.map(item => item.recovered);
    const chartData = {
      labels: dates,
      datasets:[
        {
          label: 'Confirmed Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: '#2196F3',
          borderWidth: 2,
          data: confirmed
        },
        {
          label: 'Deaths',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: '#F44336',
          borderWidth: 2,
          data: deaths
        },
        {
          label: 'Recovered Cases',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: '#4CAF50',
          borderWidth: 2,
          data: recovered
        }
      ]
    }
    return (
      <Grid style={{display: 'flex', flexDirection: 'column'}}>
        <Line
            data={chartData}
            options={{
            title:{
                display: true,
                text: 'Development of COVID-19 Cases in Sri Lanka',
                fontSize: 24
            },
            legend:{
                display: false,
                position: 'right'
            }
            }}
          />
      </Grid>
    );
  }
}

export default RecoveryChart;
