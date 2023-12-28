import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn(){
    const {user, isAuthenticated} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(){
        if(email == '' || password == ''){
            return;
        }
        console.log(`O email digitado foi ${email}`)
        // preventDefault()
    }

    return(
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../logos/logo.png")}
                />
            <Text style={styles.nameUser}>{user.name}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Digite seu e-mail'
                        style={styles.inputs}
                        placeholderTextColor="#f0f0f0"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder='Senha'
                        style={styles.inputs}
                        secureTextEntry={true}
                        placeholderTextColor="#f0f0f0"
                        value={password}
                        onChangeText={setPassword}
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.btnText}>Acessar</Text>
                    </TouchableOpacity>

                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1d1d2e"
    },
    logo: {
        marginBottom: 18,
    },
    inputContainer:{
        width: '95%',
        alignItems: "center",
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    inputs:{
        width: '95%',
        height: 40,
        backgroundColor: '#101026',
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#fff"
    },
    button:{
        width: '95%',
        height: 40,
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: "#101026"

    },
    nameUser:{
        color: "#fff",
        justifyContent: 'flex-end'
    }
})