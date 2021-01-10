import React from 'react';
import { Typography, Paper, Hidden } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';


class DevelopmentChart extends React.Component {
  renderLineChart = (chartData, height) => {
    const { t } = this.props;
    return (
      <Line
        data={chartData}
        height={height}
        options={{
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: t('Number of Cases')
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: t('Date')
              }
            }]
          },
          title:{
            display: false
          },
          legend:{
            display: true,
            position: 'top',
            labels: {
              fontSize: 14
            }
          }
        }}
      />
    );
  }

  render() {
    const { data, t, tReady } = this.props;

    const recentData = data.slice(Math.max(data.length - 14, 0));
    const dates = recentData.map(item => item.date);
    const confirmed = recentData.map(item => item.confirmed);
    const deaths = recentData.map(item => item.deaths);
    const recovered = recentData.map(item => item.recovered);
    const chartData = {
      labels: dates,
      datasets:[
        {
          label: t('Confirmed Cases'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          borderWidth: 2,
          data: confirmed
        },
        {
          label: t('Deaths'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#F44336',
          borderColor: '#F44336',
          borderWidth: 2,
          data: deaths
        },
        {
          label: t('Recovered Cases'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 2,
          data: recovered
        }
      ]
    }
    return (
      <Paper style={{display: 'flex', flexDirection: 'column', marginTop: 20, padding: 24}}>
        <Typography variant="h5" style={{marginBottom: 20}}>
          {tReady && t('Development of COVID-19 cases in Sri Lnaka for the past 2 weeks')}
        </Typography>
        <Hidden mdDown>
          {this.renderLineChart(chartData, 160)}
        </Hidden>
        <Hidden lgUp>
          {this.renderLineChart(chartData, 300)}
        </Hidden>
      </Paper>
    );
  }
}

export default withTranslation()(DevelopmentChart);
