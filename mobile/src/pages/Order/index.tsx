import React, {useState, useContext, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from "react-native";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/listItem";

import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";


export type RouteDetailParams = {
    Order:{
        number: string | number;
        order_id:string;
    }
}

export type ProductProps = {
    id: string,
    name: string,
    // price: string | number | undefined
}

export type CategoryProps = {
    id: string,
    name: string
}

export type ItemProps = {
    id: string,
    product_id: string,
    // price: string | number | undefined,
    name: string,
    amount: string | number
}

type OrderRouterProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){

    const route = useRoute<OrderRouterProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

    const [category, setCategory] = useState<CategoryProps[] | []>([]);
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    const [products, setProducts] = useState<ProductProps[] | []>([]);
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
    const [modalProductVisible, setModalProductVisible] = useState(false);

    const [amount, setAmount] = useState('1');
    const [items, setItems] = useState<ItemProps[] | []>([])

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get("/category")
            setCategory(response.data);
            setCategorySelected(response.data[0])
        }
        loadInfo();
    }, []);

    useEffect(() => {
        async function loadProducts(){
            // Buscando produto de uma categoria selecionada
            const response = await api.get("/category/product", {
                params:{
                    category_id: categorySelected?.id
                }
            })
            //console.log(response.data);
            setProducts(response.data);
            setProductSelected(response.data[0])

        }

        loadProducts();

    }, [categorySelected])

    // Fazendo uma requisição do tipo delete
   async function handleCloseOrder(){
        try {
            await api.delete("/delete/order", {
                params:{
                    order_id: route.params?.order_id,
                }
            })
            navigation.goBack();
        } catch (error) {
            console.log(`Algo deu errado na requisição ${error}`)
        }
    }

    function handleChangeCategory(item: CategoryProps){
        setCategorySelected(item)
    }

     function handleChangeProduct(item: ProductProps){
        setProductSelected(item)
    }

    // Fazendo a chamada a api
    async function handleAddItem(){
        const response = await api.post("/order/add", {
            order_id: route.params?.order_id,
            product_id: productSelected?.id,
            amount: Number(amount),
            // price: productSelected?.price as string,
        })
        // Criando uma lista com os item vindo do backend para passar pro setItem
        let data = {
            id: response.data.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            // price: productSelected?.price as number,
            amount: amount,
        }
        // Usando o spreed operation e mandando para o state
        setItems(oldArray => [...oldArray, data])

    }

    async function handleDeleteItem(item_id: string){
        // Fazendo a requisição delete
        // alert("CLicou" + item_id)
        await api.delete('/delete/item', {
            params: {
                item_id: item_id
            }
        })
        let removeItem = items.filter(item => {
            return (item.id !== item_id)
        })
        setItems(removeItem)
    }

    function handleFinishOrder(){
        navigation.navigate("FinishOrder");
    }


    return(
        <View style={styles.container}>
           <View style={styles.header}>
            <Text style={styles.title}>MESA: {route.params.number}</Text>

                {items.length === 0 && (
                     <TouchableOpacity onPress={handleCloseOrder}>
                       <Feather name="trash-2" size={28} color="#ff3f" />
                    </TouchableOpacity>
                )}
           </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
                    <Text style={{color: '#fff'}}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>

            )}


        <View style={styles.qtdContainer}>
            <Text style={styles.qtdText}>Quantidade</Text>

            <TextInput
            style={[styles.input, {width: '60%', textAlign: 'center'}]}
            // placeholder="1"
            placeholderTextColor="#f0f0f0"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            />
        </View>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.buttonAdd}
            onPress={handleAddItem}

            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, {opacity: items.length === 0 ? 0.3 : 1}]}
                disabled={items.length === 0}
                onPress={handleFinishOrder}
            >
                <Text style={styles.buttonText}>Avancar</Text>
            </TouchableOpacity>
        </View>

        <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24}}
        data={items} // Qual a sua lista de items que vai esta dentro do useState
        keyExtractor={ (item) => item.id} // Para saber qual o id de cada item
        renderItem={ ({ item }) => <ListItem data={item} deleteItem={handleDeleteItem}/>} // Forma como eu quero que seja renderizado a tela

        />

        <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
        >
            <ModalPicker
            handleCloseModal={ () => setModalCategoryVisible(false)}
            options={category}
            selectedItem={handleChangeCategory}
            />

        </Modal>

        <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
        >
            <ModalPicker
                handleCloseModal={ () => setModalProductVisible(false)}
                options={products}
                selectedItem={handleChangeProduct}

            />
        </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingHorizontal: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header:{
        flexDirection: 'row', // Colocando um item ao lado do outro
        alignItems: 'center',
        alignContent: 'space-between',
        // marginLeft: 22,
        marginTop: 25
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 15
    },
    input:{
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold'
    },
    qtdContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    qtdText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },
    buttonAdd:{
        width:"20%",
        backgroundColor: "#3fd1ff",
        borderRadius: 4,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText:{
        color: "#8a8a8a",
        fontSize: 18,
        fontWeight: 'bold'
    },
    button:{
        backgroundColor: "#3fffa3",
        borderRadius: 4,
        height: 40,
        width: "75%",
        alignItems: "center",
        justifyContent: "center"
    }
})
