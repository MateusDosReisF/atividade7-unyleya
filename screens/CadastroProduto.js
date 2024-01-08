import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const CadastroProduto = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState(null);


  const abrirGaleria = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const imagemSelecionada = response.assets[0].uri;
        console.log('URI da imagem:', imagemSelecionada);
        setImagem(imagemSelecionada);
      }
    });
  };
  
  const cadastrarProduto = () => {
    // Validar campos obrigatórios
    if (!codigo || !descricao || !preco || !categoria) {
      alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const novoProduto = {
      codigo,
      descricao,
      preco,
      categoria,
      imagem: imagem || null, 
    };
  
    //  requisição POST para cadastrar o produto
    axios.post('http://192.168.1.7:3000/produto', novoProduto)
      .then(response => {
        alert('Cadastro', 'Produto cadastrado com sucesso!');
        // Limpar os campos
        setCodigo('');
        setDescricao('');
        setPreco('');
        setCategoria('');
        setImagem(null);
      })
      .catch(error => {
        console.error('Erro na requisição POST:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o produto. Por favor, tente novamente.');
      });
  };
  

  return (
    <View style={styles.container}>
      {imagem ? (
        <Image
          source={{ uri: imagem}}
          style={styles.productImage}
        />
      ) : null}
      <Text style={styles.title}>Cadastro de Produto</Text>
      
      <TextInput
        placeholder="Código"
        value={codigo}
        onChangeText={text => setCodigo(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={text => setDescricao(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={text => setPreco(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Categoria"
        value={categoria}
        onChangeText={text => setCategoria(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={abrirGaleria}>
        <Text style={styles.selectImageText}>Selecionar Imagem da Galeria</Text>
      </TouchableOpacity>
      <Button
        title="Cadastrar Produto"
        onPress={cadastrarProduto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 15,
    borderRadius: 5,
    resizeMode:'contain'
  },
  selectImageText: {
    color: 'blue',
    marginBottom: 15,
  },
});

export default CadastroProduto;
