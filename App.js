import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import CadastroProduto from './screens/CadastroProduto';
import EdicaoProduto from './screens/EdicaoProduto';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroProduto" component={CadastroProduto} />
        <Stack.Screen name="EdicaoProduto" component={EdicaoProduto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
