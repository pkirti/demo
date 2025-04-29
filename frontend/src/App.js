import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Alerts from './pages/Alerts';
import SalesTrends from './pages/SalesTrends';
import UserManagement from './pages/UserManagement';

const App = () => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Retail Inventory Management</Typography>
          <Button color="inherit" href="/">Home</Button>
          <Button color="inherit" href="/inventory">Inventory</Button>
          <Button color="inherit" href="/alerts">Alerts</Button>
          <Button color="inherit" href="/sales-trends">Sales Trends</Button>
          <Button color="inherit" href="/user-management">User Management</Button>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/inventory" component={Inventory} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/sales-trends" component={SalesTrends} />
        <Route path="/user-management" component={UserManagement} />
      </Switch>
    </Container>
  );
};

export default App;
