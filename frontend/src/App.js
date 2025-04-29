import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Inventory from './components/Inventory';
import Alerts from './components/Alerts';
import SalesTrends from './components/SalesTrends';
import Notification from './components/Notification';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Retail Inventory Management
          </Typography>
          <Button color="inherit" component={Link} to="/">Inventory</Button>
          <Button color="inherit" component={Link} to="/alerts">Alerts</Button>
          <Button color="inherit" component={Link} to="/sales-trends">Sales Trends</Button>
          <Button color="inherit" component={Link} to="/notification">Notification</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={Inventory} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/sales-trends" component={SalesTrends} />
        <Route path="/notification" component={Notification} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
