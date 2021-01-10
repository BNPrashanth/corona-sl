import React from 'react';
import { Grid, AppBar, Button, Typography, Hidden, Divider } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import i18n from "i18next";


class Header extends React.Component {
  state = {
    open: false,
    lang: {
      code: "en"
    },
    anchorEl: null,
  };

  componentDidMount() {
    const langAvailable = localStorage.getItem('PSH_COVID19_TRACKER_LANG');
    if (langAvailable && langAvailable !== '') {
      this.setState({ lang: { code: langAvailable } });
    }
  }

  openLanguagesMenu = event => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  onLanguageChange = lang => {
    this.setState({ lang })
    i18n.changeLanguage(lang.code);

    localStorage.setItem('PSH_COVID19_TRACKER_LANG', lang.code)
  }

  renderButtons = () => {
    return (
      <React.Fragment>
        <Button onClick={() => this.onLanguageChange({code: 'sn'})}>
          සිංහල
        </Button>
        <Divider orientation="vertical" flexItem style={{margin: '0px 4px'}} />
        <Button onClick={() => this.onLanguageChange({code: 'ta'})}>
          தமிழ்
        </Button>
        <Divider orientation="vertical" flexItem style={{margin: '0px 4px'}} />
        <Button style={{textTransform: 'none'}} onClick={() => this.onLanguageChange({code: 'en'})}>
          English
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { t, tReady } = this.props;

    return (
      <AppBar
        color="default"
        position="static"
        style={{
          padding: '10px 30px'
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Hidden mdDown>
              <Typography variant="h5">
                {tReady && t('COVID-19 Tracker for Sri Lanka')}
              </Typography>
            </Hidden>
            <Hidden lgUp>
              <Typography variant="h5" align="center">
                {tReady && t('COVID-19 Tracker for Sri Lanka')}
              </Typography>
            </Hidden>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
              {tReady && this.renderButtons()}
            </Grid>
          </Hidden>
          <Hidden lgUp>
            <Grid item xs={12} md={6} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              {tReady && this.renderButtons()}
            </Grid>
          </Hidden>
        </Grid>
        
      </AppBar>
    );
  }
}

export default withTranslation()(Header);
