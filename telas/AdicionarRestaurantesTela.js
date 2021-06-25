import React, { useState } from 'react'
import { Button, Image, Slider, StyleSheet, Text, TextInput, View, Picker, TouchableOpacity } from 'react-native'

import * as ImagePicker from 'expo-image-picker';

import 'firebase/firestore'
import 'firebase/storage'
import * as firebase from 'firebase'
import ENV from '../env'

if (!firebase.apps.length){
  firebase.initializeApp(ENV);
}

const firestore = firebase.firestore();
const storage = firebase.storage();
const database = firebase.database();

const restaurantesCollection = firestore.collection('restaurantes');
const imagensRef = storage.ref('imagens');
const imagensCounterRef = database.ref("imagensCounter");

const AdicionarRestaurantesTela = (props) => {
  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [categoria, setCategoria] = useState('Categoria');
  const [preco, setPreco] = useState(3);
  const [fotoURI, setFotoURI] = useState ();

  const tirarFoto = async () => {
    let foto = await ImagePicker.launchImageLibraryAsync({
      quality: 1
    })
    setFotoURI(foto.uri)
  }

  return (
    <View style={styles.container}>
      
      <TextInput 
        style={styles.nomeTextInput}
        placeholder="Nome do restaurante"
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />

      <View style={styles.cidadeECategoriaView}>
        
      <TextInput 
          style={styles.cidadeTextInput}
          placeholder="Cidade"
          onChangeText={(texto) => setCidade(texto)}
          value={cidade}
        />

        <Picker
          selectedValue={categoria}
          style={styles.categoriaPicker}
          onValueChange={(value, index) => {setCategoria(value)}}
          mode="dropdown"
        >
          <Picker.Item label="Categoria" value="Categoria" />
          <Picker.Item label="Japonês" value='Japonês' />
          <Picker.Item label="Brasileiro" value= "Brasileiro" />
  
        </Picker>
        
      </View>

      <View style={styles.precoView}>
        <Text>Preço</Text>
        <Slider 
          style={styles.precoSlider}
          minimumValue={1}
          maximumValue={5}
          value={preco}
          step={1}
          onValueChange={(value) => setPreco(value)}
        />
      </View>

      <View
        style={styles.previewDaImagemView}
      >
        {
          fotoURI ?
            <Image
              style={{width: '100%', height: '100%'}}
              source={{uri:fotoURI}}
            />
          :
            <Text>Sem foto</Text>
        }      
      </View>

      <View
        style={styles.tirarFotoButton}>
         <Button 
            title="Selecionar foto"
            onPress={() => tirarFoto()}
         /> 
      </View>

      <TouchableOpacity style={styles.fab}>
        <Text style={styles.iconeFab}>
          OK
        </Text>
      </TouchableOpacity>


    </View>
  )
}

export default AdicionarRestaurantesTela

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },

  nomeTextInput: {
    width: "90%",
    textAlign: "center",
    padding: 8,
    fontSize: 16,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    marginVertical: 12,
    alignSelf: 'center'
  },
  cidadeECategoriaView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16
  },
  cidadeTextInput: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  },
  categoriaPicker: {
    width: '40%'
  },
  precoView: {
    marginVertical: 12,
    alignItems: 'center'
  },
  precoSlider: {
    width: '95%',
    marginVertical: 8
  },
  previewDaImagemView: {
    alignSelf: 'center',
    width: '90%',
    height: 200,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  tirarFotoButton: {
    width: '90%', 
    alignSelf: 'center',
    marginTop: 8
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  iconeFab: {
    fontSize: 14,
    color: 'white'
  }

})
