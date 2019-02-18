import React from 'react';
import {Switch} from 'react-router-dom';

import Layout from './hoc/Layout';

import PrivateRoutes from './components/authRoutes/privateRoutes';
import PublicRoutes from './components/authRoutes/publicRoutes';

import Home from './components/home';
import Signin from './components/signin';
import Dashboard from './components/admin/dashboard';


const Routes = (props) => {
  console.log(props);
  return(
    <Layout>
      <Switch>
            <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>


            <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={Signin} />
            <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />


        </Switch>
    </Layout>
  )
}

export default Routes;

