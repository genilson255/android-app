import React, {useState, useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Dashboard from '../pages/Dashboard';
import Order from '../pages/Order';
import FinishOrder from '../pages/FinishOrder';
import { AuthContext } from '../contexts/AuthContext';

export type StackParamsList = {
    Dashboard: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string,
        order_id: string
    }
}

const stack = createNativeStackNavigator<StackParamsList>();

    function AppRoutes(){
        const {user} = useContext(AuthContext)
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
                 options={{headerShown: false}}
                />
                <stack.Screen
                name='FinishOrder'
                component={FinishOrder}
                options={{
                    title: ` Finalizando! `,
                    headerStyle:{
                        backgroundColor: "#1d1d2e"
                    },
                    headerTintColor: "#fff"
                 }}
                />
            </stack.Navigator>
        )
    }

export default AppRoutes;
