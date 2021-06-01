import React, {Component} from 'react';
import {View,Text, StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


class LoadingScene extends Component{
  render()
  {
    return(
      <View style={styles.container}>
        <View style={{backgroundColor:'#0E638B',width:120,height:120,borderRadius:120,
                        marginHorizontal:-40,marginTop:-40}}></View>
        <View style={{backgroundColor:'white', width:200,height:200,borderRadius:200,marginLeft:110,marginTop:50}}>
          <Image  style ={{width:120,height:120,alignItems:'center',
        justifyContent:'center',marginHorizontal:40,marginVertical:40}} source={require('../images/graph.png')}/>
          <Text style={{color:'#646769',fontSize:30,fontWeight:'bold',width:230,marginTop:-20}}>Stock Manager</Text>
        </View>
        <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.props.navigation.navigate("AuthScene")}>
                  <Text style={{...styles.buttonText, color:'#646769'}}>SIGN IN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCont} onPress={()=> this.props.navigation.navigate("CreateUser")}>
                  <Text style={{...styles.buttonText, color:'white'}}>SIGN UP</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
      
    }
  }
export default LoadingScene;

const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'white'
    },
    logoContainer:{
      backgroundColor:'white',
      flex:2,
    },
    logoImage:{
      width:150,
      height:150,
      tintColor:'white',
      marginLeft:150,
      alignItems:'center',
      justifyContent:'center',
      marginTop:120
  },
    infoContainer:{
      position:'absolute',
      flex:1,
      left:0,
      right:0,
      bottom:0,
      padding:25,
      backgroundColor:'white',
      //borderRadius:30
    },
    buttonContainer:{
      backgroundColor:'white',
      paddingVertical:15,
      marginTop:30,
      borderRadius:30,
      borderBottomWidth:2,
      borderTopWidth:2,
      borderLeftWidth:2,
      borderRightWidth:2,
      borderColor:'#03999C',
      marginHorizontal:80,
      width:200,
      alignItems:'center',
      justifyContent:'center',
      elevation:20,
      //shadowOpacity:1
    },
    buttonCont:{
      backgroundColor:'#03999C',
      paddingVertical:15,
      marginTop:20,
      borderRadius:30,
      borderBottomWidth:3,
      borderTopWidth:3,
      borderLeftWidth:3,
      borderRightWidth:3,
      borderColor:'#03999C',
      marginHorizontal:80,
      width:200,
      alignItems:'center',
      justifyContent:'center',
      elevation:15
    },
    buttonText:{
      textAlign:'center',
      fontSize:18,
    }
})