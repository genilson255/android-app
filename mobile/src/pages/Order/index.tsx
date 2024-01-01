import React, {useState, useContext} from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Order(){
    return(
        <View style={styles.container}>
            <Text>Tela de Order</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#155000"
    }
})
