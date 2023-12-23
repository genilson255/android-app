import React from 'react';
import {View} from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const isAuthenticated = false;
const isLoading = false;

function Routes(){
    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes />
    )
}

export default Routes;
