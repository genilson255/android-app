import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';

const authStack = createNativeStackNavigator();
    function AuthRoutes(){
        return(
            <authStack.Navigator>
                <authStack.Screen  name='SignIn' component={SignIn}/>
            </authStack.Navigator>
        )
    }

export default AuthRoutes;
