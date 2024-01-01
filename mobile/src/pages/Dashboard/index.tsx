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

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const {signOut, user} = useContext(AuthContext);
    const [number, setNumber] = useState('');

    async function openOrder(){
        if (number === ''){
            return;
        }
        // Precisa fazer a requisição e abrir a mesa e navegar para a proxima tela
        navigation.navigate("Order", {number: number, order_id: 'ebe8c0be-b948-49ac-ab45-b6a2e0d8195c'})
    }

    return(
        <>
           <View style={styled.deslogar}>
            <Text style={styled.userLodado}>Atendente: {user?.name}
            <TouchableOpacity onPress={signOut}>
                <Text >Sair</Text>
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
        marginRight: 10,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        fontWeight: 'bold'
    },
    sair:{
        // width: '50%',
        // height: 40,
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        // marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deslogar:{
        alignItems: 'center',
        justifyContent: 'center',
        // alignContent: 'space-around',
        alignContent: 'space-between',
        marginLeft: 10
        // alignContent: 'center'
    }
})