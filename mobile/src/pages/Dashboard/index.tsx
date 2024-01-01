import React, {useContext} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard(){
    const {signOut, user} = useContext(AuthContext);

    function handleLogout(){}

    return(
        <>
           <View>
            <Text style={styled.userLodado}>Atendente: {user.name}
           </Text>
            </View>

            <SafeAreaView style={styled.areaView}>
                    <Text style={styled.title}>Novo Pedido!</Text>
                    <TextInput style={styled.input}
                        keyboardType='numeric'
                        placeholder='Numero da mesa'
                        placeholderTextColor="#f0f0f0" />

                    <TouchableOpacity style={styled.button}>
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
        justifyContent: 'flex-end',
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
    }
})