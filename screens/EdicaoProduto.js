import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'react-native-image-picker';

const EdicaoProduto = ({ route, navigation }) => {
  const { produto } = route.params;
  const [descricao, setDescricao] = useState(produto.descricao);
  const [preco, setPreco] = useState(produto.preco.toString());
  const [categoria, setCategoria] = useState(produto.categoria);
  const [imagem, setImagem] = useState(produto.image);

  const abrirGaleria = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        const novaImagem = response.assets[0].uri;
        console.log('Nova URI da imagem:', novaImagem);
        setImagem(novaImagem);
      }
    });
  };

  const salvarEdicao = () => {
    // requisição PATCH para atualizar o produto
    axios.patch(`http://192.168.1.7:3000/produto/${produto.id}`, {
      descricao,
      preco,
      categoria,
      imagem,
    })
      .then(response => {
        console.log('Produto atualizado com sucesso:', response.data);
        // Navegar de volta para a tela Home após a edição
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Erro na requisição PATCH:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição de Produto</Text>
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{produto.descricao}</Text>
        <Text>Código: {produto.codigo}</Text>
        <TextInput
          placeholder="Nova Descrição"
          value={descricao}
          onChangeText={text => setDescricao(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Novo Preço"
          value={preco}
          onChangeText={text => setPreco(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Nova Categoria"
          value={categoria}
          onChangeText={text => setCategoria(text)}
          style={styles.input}
        />
        <TouchableOpacity onPress={abrirGaleria}>
          <Text style={styles.selectImageText}>Selecionar Nova Imagem</Text>
        </TouchableOpacity>
        {imagem ? (
          <Image
            source={{ uri: imagem }}
            style={styles.productImage}
          />
        ) : (
          <Text>Imagem não disponível</Text>
        )}
        <Button
          title="Salvar Edição"
          onPress={salvarEdicao}
        />
      </View>
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
  productContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  selectImageText: {
    color: 'blue',
    marginBottom: 10,
  },
});

export default EdicaoProduto;
