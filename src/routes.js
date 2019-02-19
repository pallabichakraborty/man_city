import React from 'react';
import {Switch} from 'react-router-dom';

import Layout from './hoc/Layout';

import PrivateRoutes from './components/authRoutes/privateRoutes';
import PublicRoutes from './components/authRoutes/publicRoutes';

import Home from './components/home';
import Signin from './components/signin';
import Dashboard from './components/admin/dashboard';
import AdminMatches from './components/admin/match';
import AddEditMatches from './components/admin/match/addEditMatches';
import Players from './components/admin/players';
import AddEditPlayers from './components/admin/players/addEditPlayers';


const Routes = (props) => {
  return(
    <Layout>
      <Switch>
            <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
            <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches} />
            <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatches} />
            <PrivateRoutes {...props} path="/admin_matches/add_match" exact component={AddEditMatches} />
            <PrivateRoutes {...props} path="/admin_players" exact component={Players} />
            <PrivateRoutes {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers} />
            <PrivateRoutes {...props} path="/admin_players/add_players" exact component={AddEditPlayers} />
      
      




            <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={Signin} />
            <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />


        </Switch>
    </Layout>
  )
}

export default Routes;

