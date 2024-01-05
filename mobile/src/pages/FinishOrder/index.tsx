import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Feather} from "@expo/vector-icons";
import {useNavigation, useRoute, RouteProp} from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';
import { api } from '../../services/api';

type RouteDetailParamas = {
    FinishOrder: {
        number: string | number,
        order_id: string
    }
}

type FinishOrderRouteProps = RouteProp<RouteDetailParamas, "FinishOrder">

export default function FinishOrder(){
    const route = useRoute<FinishOrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    async function handleFinishOrder(){
        try {
            await api.put("/order/send", {
                order_id: route.params?.order_id
            })
            navigation.popToTop();
        } catch (error) {
            console.log(`Erro ao tentar fazer requisição ${error}`)
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.alerta}>Você deseja finalizar esse pedido?</Text>
            <Text style={styles.title}>Mesa {route.params?.number}</Text>

            <TouchableOpacity style={styles.botao} onPress={handleFinishOrder}>
                <Text style={styles.btnText}>Finalizar pedido</Text>
                <Feather name='shopping-cart' size={20} color="#1d1d2e"/>
            </TouchableOpacity>

        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#1d1d2e",
        paddingVertical: '5%',
        paddingHorizontal: "4%",
        alignItems: "center",
        justifyContent: "center"
    },
    alerta:{
        color:"#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4
    },
    title: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 12
    },
    botao: {
        backgroundColor: "#3fff3f",
        borderRadius: 4,
        flexDirection: 'row',
        width: '65%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 18,
        marginRight: 8,
        fontWeight: 'bold',
        color: "#1d1d2e"
    }
})
