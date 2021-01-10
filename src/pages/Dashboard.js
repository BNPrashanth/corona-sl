import React from 'react';
import { Grid, Container, CircularProgress, Divider, Typography, Link } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

import Header from '../components/Header';
import Footer from '../components/Footer';
import StatUpdate from '../components/StatUpdate';
import DevelopmentChart from '../components/charts/DevelopmentChart';
import ConfirmationChart from '../components/charts/ConfirmationChart';
import DeathsChart from '../components/charts/DeathsChart';


const styles = {
  page: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginTop: 20,
  }
};

class Dashboard extends React.Component {
  state = {
    fetching: true,
    data: null,
    slData: null,
    italyData: null,
    chinaData: null,
    spainData: null,
    usData: null,
    iranData: null,
    indiaData: null,
    ukData: null
  };

  async componentDidMount() {
    await fetch('https://hpb.health.gov.lk/api/get-current-statistical')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ data: data.data, fetching: false });
      });
    
    await fetch('https://pomber.github.io/covid19/timeseries.json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          slData: data['Sri Lanka'],
          chinaData: data['China'],
          italyData: data['Italy'],
          spainData: data['Spain'],
          usData: data['US'],
          iranData: data['Iran'],
          indiaData: data['India'],
          ukData: data['United Kingdom']
        });
      });
  }

  renderStatUpdates = (type) => {
    return (
      <StatUpdate
        type={type}
        data={this.state.data}
      />
    );
  }

  render() {
    const {
      data,
      fetching,
      slData,
      chinaData,
      italyData,
      usData,
      spainData,
      indiaData,
      iranData,
      ukData
    } = this.state;
    const { t } = this.props;

    return (
      <Grid container style={styles.page}>
        <Header />
        <Container
          maxWidth="xl"
          id="content-container"
          style={styles.container}
        >
          <Grid container style={{display: 'flex', flex: 1, justifyContent: 'center'}}>
            <Grid item xs={12} md={10} lg={10}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  {
                    fetching &&
                    <Grid style={{display: 'flex', minHeight: '80vh', justifyContent: 'center', alignItems: 'center'}}>
                      <CircularProgress color="secondary" />
                    </Grid>
                  }
                  {
                    data && !fetching &&
                    <Grid style={{display: 'flex', flexDirection: 'column'}}>
                      {this.renderStatUpdates('local')}
                      <Divider style={{marginTop: 40, marginBottom: 20, height: 2}} />
                      {this.renderStatUpdates('global')}
                      <Divider style={{marginTop: 40, marginBottom: 20, height: 2}} />
                      <Typography variant="h6" align="center">
                        {t('To get more information about COVID-19 please visit')}
                      </Typography>
                      <Link href="https://hpb.health.gov.lk/en/covid-19" target="_blank" style={{cursor: 'pointer'}}>
                        <Typography variant="h6" align="center">{t('Health Promotions Bureau')}</Typography>
                      </Link>
                      <Divider style={{marginTop: 20, marginBottom: 20, height: 2}} />
                      {slData && <DevelopmentChart data={slData} />}
                      {slData && <ConfirmationChart
                        sl={slData}
                        china={chinaData}
                        italy={italyData}
                        spain={spainData}
                        iran={iranData}
                        us={usData}
                        india={indiaData}
                        uk={ukData}
                      />}
                      {slData && <DeathsChart
                        sl={slData}
                        china={chinaData}
                        italy={italyData}
                        spain={spainData}
                        iran={iranData}
                        us={usData}
                        india={indiaData}
                        uk={ukData}
                      />}
                      <Footer />
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  }
}

export default withTranslation()(Dashboard);
