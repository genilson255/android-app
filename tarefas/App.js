import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, {useState} from 'react';
import {FontAwesome} from "@expo/vector-icons"

export default function App() {
  const [tarefa, setTarefa] = useState('');

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

    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#222555",
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
  }
})