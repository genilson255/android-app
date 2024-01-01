import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
}

const stack = createNativeStackNavigator<StackParamsList>();

    function AppRoutes(){
        return(
            // Observação, todo componenete novo que vai precisar ser renderizado
            //Precisa ser criado uma nova stack
            <stack.Navigator>
                <stack.Screen
                 name='Dashboard'
                 component={Dashboard}
                 options={{headerShown: false}}
                />
                <stack.Screen
                 name='Order'
                 component={Order}
                 options={{headerShown: true}}
                />
            </stack.Navigator>
        )
    }

export default AppRoutes;
