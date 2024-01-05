import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Navegação de rotas
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {StackParamsList} from '../../routes/app.routes';

import { api } from '../../services/api';

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const {signOut, user} = useContext(AuthContext);
    const [number, setNumber] = useState('');

    async function openOrder(){
        if (number === ''){
            return;
        }
        // Precisa fazer a requisição e abrir a mesa e navegar para a proxima tela
        const response = await api.post("/order", {
            name: 'name',
            table: Number(number)
        })
        // console.log(response.data)
        navigation.navigate("Order", {number: number, order_id: response.data.id});
        setNumber('');
    }

    return(
        <>
           <View style={styled.deslogar}>
                <Text style={styled.userLodado}>Atendente: {user?.name}

                    <TouchableOpacity onPress={signOut}>
                        <Text style={styled.saindo}>Sair</Text>
                    </TouchableOpacity>

            </Text>
            </View>

            <SafeAreaView style={styled.areaView}>
                    <Text style={styled.title}>Novo Pedido!</Text>

                    <TextInput style={styled.input}
                        keyboardType='numeric'
                        placeholder='Numero da mesa'
                        placeholderTextColor="#f0f0f0"
                        value={number}
                        onChangeText={setNumber}
                        />

                    <TouchableOpacity style={styled.button} onPress={openOrder}>
                        <Text style={styled.btnText}>Abrir Mesa</Text>
                    </TouchableOpacity>

            </SafeAreaView></>
    )
}

const styled = StyleSheet.create({
    areaView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#1d1d2e'
    },
    userLodado:{
        textAlign: "right",
        fontWeight: "bold",
        color: "#12a",
        // marginRight: 10,
        // marginTop: 10,
        justifyContent: 'space-between',
        // flexDirection: "row"
    },
    title: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: 'bold',
        color: "#fff",
        marginBottom: 24,
    },
    input:{
        width: '90%',
        height: 60,
        backgroundColor: "#101026",
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        color: '#fff',
        fontSize: 22
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        fontSize: 18,
        color: '#101026',
        fontWeight: 'bold',
        // justifyContent: "space-between"
        justifyContent: "flex-end",
    },
    sair:{
        width: '50%',
        // height: 40,
        // backgroundColor: '#3fffa3',
        // borderRadius: 4,
        // marginVertical: 12,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    saindo: {
        flexDirection: "row",
        marginLeft: 20,
        textAlign: 'right'

    },
    deslogar:{
        alignItems: 'center',
        // justifyContent: 'center',
        // alignContent: 'space-around',
        // alignContent: 'space-between',
        marginLeft: 10,
        // alignContent: 'center'
    }
})