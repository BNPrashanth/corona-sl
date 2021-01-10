import React from 'react';
import { Typography, Paper, Hidden } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { withTranslation } from 'react-i18next';


class DeathsChart extends React.Component {
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
                labelString: t('Days')
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
    const { sl, china, italy, spain, us, uk, iran, india, t, tReady } = this.props;

    const dates = Array.from(Array(sl.length).keys());
    const slData = sl.map(item => item.deaths);
    const chinaData = china.map(item => item.deaths);
    const italyData = italy.map(item => item.deaths);
    const spainData = spain.map(item => item.deaths);
    const usData = us.map(item => item.deaths);
    const iranData = iran.map(item => item.deaths);
    const indiaData = india.map(item => item.deaths);
    const ukData = uk.map(item => item.deaths);
    const chartData = {
      labels: dates,
      datasets:[
        {
          label: t('Sri Lanka'),
          fill: false,
          lineTension: 1,
          backgroundColor: '#2196F3',
          borderColor: '#2196F3',
          borderWidth: 2,
          data: slData
        },
        {
          label: t('China'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#F44336',
          borderColor: '#F44336',
          borderWidth: 2,
          data: chinaData
        },
        {
          label: t('Italy'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#4CAF50',
          borderColor: '#4CAF50',
          borderWidth: 2,
          data: italyData
        },
        {
          label: t('Spain'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#009688',
          borderColor: '#009688',
          borderWidth: 2,
          data: spainData
        },
        {
          label: t('United States'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#ff9800',
          borderColor: '#ff9800',
          borderWidth: 2,
          data: usData
        },
        {
          label: t('Iran'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#e91e63',
          borderColor: '#e91e63',
          borderWidth: 2,
          data: iranData
        },
        {
          label: t('India'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#00bcd4',
          borderColor: '#00bcd4',
          borderWidth: 2,
          data: indiaData
        },
        {
          label: t('United Kingdom'),
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#ffeb3b',
          borderColor: '#ffeb3b',
          borderWidth: 2,
          data: ukData
        }
      ]
    }
    return (
      <Paper style={{display: 'flex', flexDirection: 'column', marginTop: 20, padding: 24}}>
        <Typography variant="h5" style={{marginBottom: 20}}>
          {tReady && t('Deaths caused due to COVID-19 all over the world')}
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

export default withTranslation()(DeathsChart);
