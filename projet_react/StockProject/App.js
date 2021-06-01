/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
//import LoadingScene from './components/LoadingScene';
import AppNavigator from './Navigation/Navigation';
import DrawerNavigation from './Navigation/DrawerNavigation';

class App extends Component{
  render(){
    return(
      <AppNavigator/>
    );
      
    }
  }

export default App;
