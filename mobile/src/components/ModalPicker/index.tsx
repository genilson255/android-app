import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps{
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

const {width: WIDTH, height: HEIGHT} = Dimensions.get('window'); // Pegando as dimenções da tela do user
export function ModalPicker({
    options,
    handleCloseModal,
    selectedItem
}: ModalPickerProps){


    function onPressItem(item: CategoryProps){
        // console.log(item)
        selectedItem(item) // Passando o item clicado/selecionado
        handleCloseModal();
    }


    const option = options.map((item, index) => (
        <TouchableOpacity  key={index} style={styles.options} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>
                {item?.name}
            </Text>
        </TouchableOpacity>
    ));

    return(
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <Text style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    content:{
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: '#8a8a8a',
        borderRadius: 4,
    },
    options:{
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8a8a8a'
    },
    item:{
        margin: 18,
        fontSize: 14,
        color: '#101026',
        fontWeight: 'bold'
    }
})
