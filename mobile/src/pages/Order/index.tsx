import React, {useState, useContext} from "react";
import { View, Text, StyleSheet } from "react-native";
import {useRoute, RouteProp} from '@react-navigation/native';

type RouteDetailParams = {
    Order:{
        number: string | number;
        order_id:string;
    }
}

type OrderRouterProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){

    const route = useRoute<OrderRouterProps>();

    return(
        <View style={styles.container}>
            <Text>Tela de Order</Text>
            <Text>{route.params.number}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#gray"
    }
})
