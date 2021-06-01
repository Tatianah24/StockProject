import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, Image, ScrollView} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {Card} from 'react-native-shadow-cards';

class Home extends Component{

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{color:'white',fontSize:25,alignItems:'center',justifyContent:'center',
          marginHorizontal:150,marginTop:30}}>Accueil</Text>
        </View>
        <View style={styles.content}>
            <View style={styles.footer}>
            <Card style={styles.fr} >
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("Fournisseur")}>
                  <Image style={styles.addButtonImg,{marginLeft:30,width:40,height:40}} source={require('../images/fournisseur.png')}/>
                <Text style={styles.txt}>Fournisseurs</Text>
              </TouchableOpacity>
              </Card>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Article")}>
                  <Image style={styles.addButtonImg,{width:40,height:40,marginLeft:10}} source={require('../images/article.png')}/>
                  <Text style={styles.txt}>Articles</Text>
              </TouchableOpacity>
           </Card>
           </View>
           <View style={styles.footer}>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Casier")}>
                  <Image style={styles.addButtonImg,{width:40,height:40}} source={require('../images/casier.png')}/>
                  <Text style={styles.txt}>Casier</Text>
              </TouchableOpacity>
           </Card>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Monnaie")}>
                  <Image style={styles.addButtonImg,{marginLeft:10,width:40,height:40}} source={require('../images/money.png')}/>
                  <Text style={styles.txt}>Monnaie</Text>
              </TouchableOpacity>
           </Card>
           </View> 
           <View style={styles.footer}>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Categorie")}>
                  <Image style={styles.addButtonImg,{width:40,height:40,marginLeft:10}} source={require('../images/cat.png')}/>
                  <Text style={styles.txt}>Catégorie</Text>
              </TouchableOpacity>
           </Card>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Type")}>
                  <Image style={styles.addButtonImg,{width:40,height:40}} source={require('../images/type.png')}/>
                  <Text style={styles.txt}>Type</Text>
              </TouchableOpacity>
           </Card>
           </View> 
           <View style={styles.footer}>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("Inventaire")}>
                  <Image style={styles.addButtonImg,{width:40,height:40,marginLeft:30}} source={require('../images/inventaire.png')}/>
                  <Text style={styles.txt}>Inventaire</Text>
              </TouchableOpacity>
           </Card>
           <Card style={styles.fr}>
              <TouchableOpacity onPress={()=>
                this.props.navigation.navigate("sortie")}>
                  <Image style={styles.addButtonImg,{marginLeft:40,width:40,height:40}} source={require('../images/sorti.png')}/>
                  <Text style={styles.txt}>Sortie d'article</Text>
              </TouchableOpacity>
           </Card>
           </View> 
        </View>
      </View>
    );
      
    }
  }

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    header:{
      backgroundColor:"#0E638B",
      height:100
    },
    content:{
        flex:2,
        backgroundColor:"white",
        justifyContent:'center',
        alignItems:'center'
    },
  addButtonImg:{
    width:60,
    height:60,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    //backgroundColor:'red'
},
    fr:{
      height:120,
      //backgroundColor:'#116BFF',
      paddingVertical:15,
      width:150,
      marginTop:20,
      borderRadius:30,
      borderBottomWidth:2,
      borderTopWidth:2,
      borderLeftWidth:2,
      borderRightWidth:2,
      borderColor:'white',
      marginLeft:20,
      alignItems:'center',
      justifyContent:'center',
      shadowOpacity:1,
      shadowColor:'black',
      shadowRadius:4,
      shadowOffset:{width:0,height:0}
    },
    txt:{
      fontSize:17,
      alignItems:'center',
      justifyContent:'center',
      color:'grey',
      marginTop:10
    },
    footer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
  }
})

export default Home;