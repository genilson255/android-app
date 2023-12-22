import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import React, {useState} from 'react';
import {FontAwesome} from "@expo/vector-icons"
import Tarefa from './src/Tarefa';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [lista, setLista ] = useState([
    {
      key: '1',
      item: 'Comprar pao'
    },
    {
      key: '2',
      item: 'Comprar um carro'
    },
  ]);

  function getText(){
    alert("Deu certo")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo-List</Text>

      <View style={styles.containerInput}>
        <TextInput
          placeholder='Digite sua tarefa...'
          style={styles.input}
          // Pegando o valor que foi digitado no input
          value={tarefa}
          onChangeText={ (e) => setTarefa(e)}

        />

        <TouchableOpacity style={styles.buttomAdd} onPress={getText}>
          <FontAwesome color="#00FFFF" name='plus' size={20} />

        </TouchableOpacity>
      </View>
      <FlatList
        data={lista}
        keyExtractor={ (item) => item.key }
        renderItem={ ({ item }) => <Tarefa data={item}/>}
        style={styles.list}
      />

    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#7B68EE",
    paddingTop: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    marginTop: "5%",
    marginStart: "5%",
    marginBottom: 12,
  },
  containerInput:{
    flexDirection: "row",
    width: "100%",
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22

  },
  input: {
    width: "75%",
    backgroundColor: "#556B2F",
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 8

  },
  buttomAdd:{
    width: "15%",
    backgroundColor: "#FF0000",
    height: 44,
    borderRadius: 4,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center'
    // paddingHorizontal: 8
  },
  list:{
    flex: 1,
    backgroundColor: '#fff',
    paddingStart: '4%',
    paddingEnd: '4%'
  },
})