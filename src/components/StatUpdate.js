import React from 'react';
import { Grid, Typography, Hidden } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import StatItem from './StatItem';
import { getMonth } from '../services/helper';
import { slFlag, globe } from '../images/images';

class StatUpdate extends React.Component {
  getUpdateTime = (dateString) => {
    const { t } = this.props;
    const dateComps = dateString.split(' ');
    const dateParts = dateComps[0].split('-');
    const timeParts = dateComps[1].split(':');
    const isPm = timeParts[0] > 12;

    return `${t(getMonth(dateParts[1]))} ${dateParts[2]}, ${dateParts[0]} ${isPm ? timeParts[0] - 12 : timeParts[0]}:${timeParts[1]} ${isPm ? t('PM') : t('AM')}`;
  };

  renderStatItem = (title, count, color, width, fontSize) => {
    return (
      <StatItem
        title={title}
        count={count}
        color={color}
        width={width}
        fontSize={fontSize}
      />
    );
  }
  
  render() {
    const { type, data, t, tReady } = this.props;
    const isGlobal = type === 'global';

    return (
      <React.Fragment>
        <Grid style={{marginBottom: 10, marginTop: isGlobal ? 0 : 0}}>
          <Grid style={{display: 'flex', flexDirection: 'row'}}>
            <img
              src={isGlobal ? globe : slFlag}
              alt={isGlobal ? 'Globe icon' : 'Sri Lanka Flag'}
              style={{height: 36, marginRight: 10}}
            />
            <Typography variant="h6">
              {tReady && t(`${type} COVID-19 updates`)}
            </Typography>
          </Grid>
          {
            type !== 'global' &&
            <Typography variant="body2">
              {tReady && t('Last updated at')}: {this.getUpdateTime(data['update_date_time'])}
            </Typography>
          }
        </Grid>
        <Hidden mdDown>
          <Grid container spacing={6}>
            {this.renderStatItem('Total Cases', data[type+'_total_cases'], '#2196F3', '80%', 20)}
            {this.renderStatItem('Total Deaths', data[type+'_deaths'], '#F44336', '80%', 20)}
            {this.renderStatItem('Total Recovered', data[type+'_recovered'], '#4CAF50', '80%', 20)}
            {this.renderStatItem('Cases Today', data[type+'_new_cases'], '#2196F3', '80%', 20)}
            {this.renderStatItem('Deaths Today', data[type+'_new_deaths'], '#F44336', '80%', 20)}
            {!isGlobal && this.renderStatItem('Total in Hospital', data['local_total_number_of_individuals_in_hospitals'], '#000000', '80%', 20)}
          </Grid>
        </Hidden>
        <Hidden lgUp >
          <Grid container spacing={3}  style={{display: 'flex', justifyContent: 'center'}}>
            {this.renderStatItem('Total Cases', data[type+'_total_cases'], '#2196F3', '100%', 16)}
            {this.renderStatItem('Cases Today', data[type+'_new_cases'], '#2196F3', '100%', 16)}
            {this.renderStatItem('Total Deaths', data[type+'_deaths'], '#F44336', '100%', 16)}
            {this.renderStatItem('Deaths Today', data[type+'_new_deaths'], '#F44336', '100%', 16)}
            {this.renderStatItem('Total Recovered', data[type+'_recovered'], '#4CAF50', '100%', 16)}
            {!isGlobal && this.renderStatItem('Total in Hospital', data['local_total_number_of_individuals_in_hospitals'], '#000000', '100%', 16)}
          </Grid>
        </Hidden>
      </React.Fragment>
    );
  }
}
export default withTranslation()(StatUpdate)
