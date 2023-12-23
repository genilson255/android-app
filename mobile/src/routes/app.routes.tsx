import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const stack = createNativeStackNavigator();
import Dashboard from '../pages/Dashboard';

    function AppRoutes(){
        return(
            <stack.Navigator>
                <stack.Screen  name='Dashboard' component={Dashboard}/>
            </stack.Navigator>
        )
    }

export default AppRoutes;
