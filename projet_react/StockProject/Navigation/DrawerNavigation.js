import React, {Component} from 'react';
import { SafeAreaView, StyleSheet,ScrollView, View, StatusBar,Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Article from '../components/Article';
import Casier from '../components/Casier';
import Categorie from '../components/Categorie';
import Fournisseur from '../components/Fournisseur';
import Inventaire from '../components/Inventaire';
import Monnaie from '../components/Monnaie';
import sortie from '../components/sortie';
import Icon from 'react-native-vector-icons/FontAwesome';

class DrawerNavigation extends Component {
    render(){
        return(
            <DrawerNavigation2/>
        )
    }
}

const CustomDrawerContentComponent = (props)=>{
    <View>
        <SafeAreaView>
            <View style={{alignItems:'center',height:200,backgroundColor:'white'}}>
                <Image  style ={{width:80,height:80,alignItems:'center',
                        justifyContent:'center'}} source={require('../images/graph.png')}/>
                <Text style={{color:'#646769',fontSize:16,fontWeight:'bold'}}>Stock Manager</Text>
            </View>
            <View>
                <DrawerItems {...props}/>
            </View>
        </SafeAreaView>
    </View>
}

const DrawerNavigator = createDrawerNavigator({
    Article:{
        screen:Article,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    Fournisseur:{
        screen:Fournisseur,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    Inventaire:{
        screen:Inventaire,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    sortie:{
        screen:sortie,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    Casier:{
        screen:Casier,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    Categorie:{
        screen:Categorie,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
    Monnaie:{
        screen:Monnaie,
        navigationOptions:{
            drawerIcon:(
                <Icon name="home" size={25} color="black"/>
            ),
        }
    },
},{
    initialRouteName:"Article",
    contentComponent:CustomDrawerContentComponent,
    drawerPosition:'left',
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle'
})

const DrawerNavigation2 = createAppContainer(DrawerNavigator)

export default DrawerNavigation;