import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const authStack = createNativeStackNavigator();
import Dashboard from '../pages/Dashboard';

    function AppRoutes(){
        return(
            <authStack.Navigator>
                <authStack.Screen  name='Dashboard' component={Dashboard}/>
            </authStack.Navigator>
        )
    }

export default AppRoutes;
