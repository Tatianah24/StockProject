import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

class BottomNavigator extends Component{
    render(){
        return(
            <View>
                <View style={{
                    position:'absolute',
                    alignSelf:'center',
                    backgroundColor:'white',
                    border:2,
                    radius:3,
                    shadowOpacity:0.3,
                    shadowRadius:3,
                    shadowOffset:{
                        height:3, width:3
                    },
                    x:0,
                    y:0,
                    style:{marginVertical:5},
                    bottom:0,
                    width:'100%',
                    height:70,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    paddingVertical:10,
                    paddingHorizontal:25
                }}>
                    {/* <View style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Home")}>
                            <Image style={{width:30, height:30}} source={require('../images/home.png')}/>
                        </TouchableOpacity>
                        <Text>Home</Text>
                    </View> */}
                    <View style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Fournisseur")}>
                            <Image style={{width:30, height:30}} source={require('../images/fr.png')}/>
                        </TouchableOpacity>
                        <Text>Fournisseur</Text>
                    </View>
                    <View style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Article")}>
                            <Image style={{width:30, height:30}} source={require('../images/article.png')}/>
                        </TouchableOpacity>
                        <Text>Articles</Text>
                    </View>
                    <View style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("categorie")}>
                            <Image style={{width:30, height:30}} source={require('../images/inventaire.png')}/>
                        </TouchableOpacity>
                        <Text>Inventaire</Text>
                    </View>
                    <View style={{
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("categorie")}>
                            <Image style={{width:30, height:30}} source={require('../images/sortie.png')}/>
                        </TouchableOpacity>
                        <Text>Sortie</Text>
                    </View>
                </View>
            </View>
    )
}
}
export default BottomNavigator;