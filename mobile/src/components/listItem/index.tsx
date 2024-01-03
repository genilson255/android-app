import React from "react";
import { View, Text, StyleSheet } from "react-native";


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
    function  somarItemArray({preco, quantidade}: somaProps){
        return(
            preco * quantidade
        )
    }

    return(
        < View style={styles.container}>
            <Text> Item: {data.name},  Qtd: {data.amount} - R$:{data.price}</Text>
            <Text>{}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#fff"
    }
})