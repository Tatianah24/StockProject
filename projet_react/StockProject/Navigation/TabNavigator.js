import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Fournisseur from '../components/Fournisseur';
import Article from '../components/Article';
import categorie from '../components/categorie';



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Fournisseur" component={Fournisseur} />
        <Tab.Screen name="Article" component={Article} />
        <Tab.Screen name="Catégorie" component={categorie} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}