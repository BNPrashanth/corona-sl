import React from 'react';
import { Grid, Typography, Divider, Link, Hidden } from '@material-ui/core';
import { withTranslation } from 'react-i18next';


class Footer extends React.Component {
  render() {
    const { t, tReady } = this.props;
    return (
      <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10, border: '0px solid #f4f4f4', borderTopWidth: 2, paddingTop: 16}}>
        <Typography>
        {tReady && t('Made By')}: <Link href={"https://www.linkedin.com/in/nalinprashanth/"} target="_blank">B.N.Prashanth</Link>
        </Typography>
        <Hidden mdDown>
          <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <Typography>
              {tReady && t('Data received from')}:&nbsp;
            </Typography>
              <Link href={"https://hpb.health.gov.lk/en"} target="_blank">{tReady && t('Health Promotions Bureau')}</Link>
              <Divider orientation="vertical" flexItem style={{margin: '0px 6px'}} />
              <Link href={"https://github.com/pomber/covid19"} target="_blank">pomber/covid19</Link>
          </Grid>
        </Hidden>
        <Hidden lgUp>
          <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%'}}>
            <Divider style={{marginTop: 4, marginBottom: 4, height: 2, width: '75%'}} />
            <Typography>
              {tReady && t('Data received from')}:&nbsp;
            </Typography>
            <Link href={"https://hpb.health.gov.lk/en"} target="_blank">{tReady && t('Health Promotions Bureau')}</Link>
            <Link href={"https://github.com/pomber/covid19"} target="_blank">pomber/covid19</Link>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default withTranslation()(Footer);
