import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { withTranslation } from 'react-i18next';


class StatItem extends React.Component {
  getCount = (count) => {
    const countAsString = count.toString();
    const countLength = countAsString.length;
    if (countLength <= 3) {
      return countAsString;
    }

    var countString = '';
    for (var i = 0; i < countLength; i++) {
      if (i !== 0 && i % 3 === 0) {
        countString = countAsString[countLength-(i+1)] + ',' + countString
      } else {
        countString = countAsString[countLength-(i+1)] + countString
      }
    }
    return countString;
  }

  render() {
    const {
      title,
      count,
      width,
      color,
      t,
      tReady
    } = this.props;

    return (
      <Grid item xs={12} sm={6} lg={4} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Paper 
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: width ? width : '100%',
            height: 150,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 6,
            background: color ? color : '#ffffff',
            color: color ? '#ffffff' : '#000000'
          }}
        >
          <Typography variant="h6" align="center" style={{marginBottom: 10, fontWeight: '600'}}>{tReady && t(title)}</Typography>
          <Typography variant="h4" align="center">{this.getCount(count)}</Typography>
        </Paper>
      </Grid>
    );
  }
}

export default withTranslation()(StatItem);
