import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [produtos, setProdutos] = useState([]);

  //Requisição usando metodo GET 
  const obterProdutos = useCallback(() => {
    axios.get('http://192.168.1.7:3000/produto')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Erro na requisição GET:', error);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', obterProdutos);
    return unsubscribe;
  }, [obterProdutos, navigation]);

  const editarProduto = (item) => {
    navigation.navigate('EdicaoProduto', { produto: item });
  };
  //Requisição usando metodo DELETE 
  const excluirProduto = (id) => {
    axios.delete(`http://192.168.1.7:3000/produto/${id}`)
      .then(response => {
        console.log('Produto excluído com sucesso:', response.data);
        obterProdutos();
      })
      .catch(error => {
        console.error('Erro na requisição DELETE:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => editarProduto(item)}>
            <View style={styles.productContainer}>
              <Text style={styles.productName}>{item.descricao}</Text>
              <Text style={styles.productInfo}>Código: {item.codigo}</Text>
              <Text style={styles.productInfo}>Preço: R${parseFloat(item.preco).toFixed(2)}</Text>
              <Text style={styles.productInfo}>Categoria: {item.categoria}</Text>
              {item.imagem ? (
                <Image
                  source={{ uri: item.imagem }}
                  style={styles.productImage}
                />
              ) : (
                <Text style={styles.productInfo}>Imagem não disponível</Text>
              )}
              <Button
                title="Excluir"
                onPress={() => excluirProduto(item.id)}
                color="#FF0000"
              />
            </View>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Ir para Cadastro de Produto"
        onPress={() => navigation.navigate('CadastroProduto')}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  productContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3, // Sombra para destacar o card
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productInfo: {
    fontSize: 16,
    marginBottom: 5,
    
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
    resizeMode: 'contain',
  },
});

export default Home;
