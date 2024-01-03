import React, {useContext} from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {Feather} from "@expo/vector-icons"

export  interface ItemProps {
    data:{
        id: string,
        product_id: string,
        price: string,
        name: string,
        amount: string | number
    }
}

type somaProps = {
    preco: number,
    quantidade: number
}

export function ListItem({data}: ItemProps){
    const {user} = useContext(AuthContext);
    function  somarItemArray({preco, quantidade}: somaProps){
        return(
            preco * quantidade
        )
    }

    return(
        
        < View style={styles.container}>

            <Text style={styles.item}> Item: {data.name},  Qtd: {data.amount} - R$:{data.price}</Text>
            <TouchableOpacity style={styles.button}>
                <Feather name="trash-2" color="#ff3f4b" size={25}/>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#101026",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: "#8a8a8a"
    },
    item: {
        color: "#fff",
        fontWeight: "bold"
    },
    button: {

    }
})