import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard(){
    const {signOut} = useContext(AuthContext);

    function handleLogout(){}

    return(
        <View>
            <Text>Hello dashboard</Text>
            <Button
            title="Sair da aplicacao"
            onPress={signOut}
            />
        </View>
    )
}
