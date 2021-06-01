import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Modal, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {MyModal} from './MyModal';
import Swipeout from 'react-native-swipeout';
import realm, {queryAllFrs, deleteFrs, updateFrs, filterFrs} from '../databases/allSchemas';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Card} from 'react-native-shadow-cards';

class Fournisseur extends Component{
    constructor(props){
        super(props);
        this.state={
            frsLists:[],
            showEdit:false,
            id_frs:'',
            nom_frs:'',
            prenom_frs:'',
            tel_frs:'',
            adresse_frs:'',
            searchText:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllFrs().then((frsLists) => {
            this.setState({frsLists});
        }).catch((error) => {
            this.setState({frsLists : []});
        });
        console.log(`reloadData`);
    }

    renderItem = ({item, index}) => {
        return( 
                    <View>
                        <Card style={styles.itemCard}>
                            <View>
                                <Text style={styles.itemText,{fontWeight:'bold',fontSize:18,marginLeft:15,marginTop:15}}>{item.nom_frs}  {item.prenom_frs}</Text>
                                <Text style={styles.itemText}>{item.tel_frs}</Text>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between'
                            }}>
                                <Text style={styles.itemText}>{item.adresse_frs}</Text>
                                <View style={{
                                    marginRight:10,
                                    marginTop:-10,
                                    height:45,
                                    width:120,
                                    borderRadius:20,
                                    backgroundColor:'#03999C',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <TouchableOpacity onPress={()=>{
                                            console.log(item.nom_frs)
                                            this.setState({showEdit:true,
                                            id_frs:item.id_frs,
                                            nom_frs:item.nom_frs,
                                            prenom_frs:item.prenom_frs,
                                            tel_frs:item.tel_frs,
                                            adresse_frs:item.adresse_frs
                                            })}}>
                                            <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                    Alert.alert(
                                        'Supprimer',
                                        'Supprimer un fournisseur',
                                    [
                                        {
                                            text:'Non', onPress:()=>{ },//Do nothing
                                            style:'Annuler'
                                        },
                                        {
                                            text:'Oui', onPress:()=>{ 
                                            deleteFrs(item.id_frs).then().catch(error => {
                                            alert(`Failed to delete Frs with id_frs=${item.id_frs}, error=${error}`);
                                        })
                                        },
                                        },
                                    ],
                            {cancelable:true}
                                    );}}>
                                            <Ionicons name="trash-sharp" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                            this.props.navigation.navigate("Details",{id_frs:item.id_frs})
                                        }}>
                                            <Ionicons name="ellipsis-vertical-circle-outline" size={33} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                    </View>    
                                </View>
                            </View>
                        </Card>
                     
               <Modal
                       animationType={'fade'}
                       transparent={true}
                       visible={this.state.showEdit}
                       title="Modifier un fournisseur"
                   >
                       <View style={{
                           flex:1,
                           backgroundColor:'#000000AA',
                           justifyContent:'center'
                       }}>   
                           <View style={{
                               backgroundColor:'#FFFFFF',
                               borderTopRightRadius: 10,
                               borderTopLeftRadius:10,
                               borderBottomLeftRadius:10,
                               borderBottomRightRadius:10,
                               margin:30,
                               padding:30,
                               marginTop:0
                           }}>
                               <View style={styles.contenu}>
                                   <View style={styles.infoContainer}>
                                   <TextInput 
                                        returnKeyType="next" onChangeText={(text) => this.setState({nom_frs :text})} 
                                       value={this.state.nom_frs} autoCorrect={false}/>
                                   </View>
                                   <View style={styles.infoContainer}>
                                   <TextInput 
                                        returnKeyType="next" onChangeText={(text) => this.setState({prenom_frs :text})} 
                                       value={this.state.prenom_frs} autoCorrect={false}/>
                                   </View>
                                   <View style={styles.infoContainer}>
                                   <TextInput 
                                        returnKeyType="next" onChangeText={(text) => this.setState({tel_frs :text})} 
                                       value={this.state.tel_frs} autoCorrect={false}/>
                                   </View>
                                   <View style={styles.infoContainer}>
                                   <TextInput 
                                        returnKeyType="next" onChangeText={(text) => this.setState({adresse_frs :text})} 
                                       value={this.state.adresse_frs} autoCorrect={false}/>
                                   </View>
                                   
                               </View>
                               <View style={styles.footer}>
                                   <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                   console.log(item.id_frs)
                                   const frsList = {
                                       id_frs:this.state.id_frs,
                                       nom_frs:this.state.nom_frs,
                                       prenom_frs:this.state.prenom_frs,
                                       tel_frs:this.state.tel_frs,
                                       adresse_frs:this.state.adresse_frs
                                   }
                                   updateFrs(frsList).then().catch(error=>{
                                       //alert(`Failed to delete Frs with frs_id=${item.frs_id}, error=${error}`);
                                       console.log(error)
                                   });
                                   this.setState({showEdit:false});
                                   }}>
                                       <Text style={styles.txt}>Modifier</Text>
                                   </TouchableOpacity>
                                   <TouchableOpacity style={styles.buttonCont} onPress={()=> this.setState({showEdit:false})}>
                                       <Text style={styles.txt}>Annuler</Text>
                                   </TouchableOpacity>
                       </View>
                            </View>
                           </View>
                   </Modal>
                   </View>  
                )}
    render(){
        let popupRef = React.createRef()

        const onShowPopup = () => {
            popupRef.show()
        }
        const onClosePopup = () => {
            popupRef.close()
        }
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <StatusBar barStyle="dark-content"/>
                        <SafeAreaView style={styles.header}>  
                            <AntDesign name="menu-fold" size={40} color="white" style={{marginLeft:10}}/>
                            <Text style={{color:"white",marginLeft:80,fontSize:20}}>Fournisseurs</Text>
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                        <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                    </TouchableWithoutFeedback>   
                    <MyModal
                        title='Ajouter un fournisseur'
                        ref={(target) => popupRef = target}
                        onTouchOutside={onClosePopup}
                    />
                        </SafeAreaView>
                </View>
                <View style={styles.content}>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={30} style={{marginLeft:30}}/>
                        <TextInput style={{marginLeft:10}} placeholder="Rechercher..." autoCorrect={false}
                        onChangeText={(text)=>{
                        this.setState({searchText: text});
                        filterFrs(text).then(filteredFrs =>{
                            this.setState({frsLists: filteredFrs});
                        }).catch(error => {
                            this.setState({frsLists : [] });
                        });
                        }}
                        value={this.state.searchText}
                        />
                    </View>
                   <View style={{flex:1}}>
                   <FlatList
                            data={this.state.frsLists}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onPressItem={()=>{
                                console.log("pressed");
                    }}/>
                   </View>    
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    txtSize:{
        fontSize:20
    },
    header:{
        flexDirection: 'row',
        //justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#0E638B',
        height:100,
        margin:0,
        width:'100%'
    },
    content:{
       flex:1
        
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white',
        marginLeft:100
    },
    itemText:{
        fontSize:18,
        marginLeft:15,
        marginTop:5
    },
    searchContainer:{
        height: 50,
        borderRadius: 10,
        //flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        marginTop: 10
    },
    textinput:{
        height:70,
        marginLeft:0,
        borderBottomWidth:3,
        borderColor:'#116BFF',
        width:'100%',
        marginTop:10,
        fontSize:16,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonCont:{
        backgroundColor:'#03999C',
        paddingVertical:15,
        width:120,
        marginTop:20,
        borderRadius:30,
        borderBottomWidth:2,
        borderTopWidth:2,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor:'white',
        marginHorizontal:5
      },
      txt:{
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        fontSize:18,
        marginLeft:30
      },
      itemCard:{
        height:120,
        width:350,
        marginHorizontal:10,
        marginBottom:10,
        marginTop:15,
        borderRadius:15,
        elevation:13,
        backgroundColor:'white'
      },
      infoContainer:{
        height:60,
        borderRadius:30,
        backgroundColor:'#F1F1F1',
        width:300,
        marginTop:20,
        fontSize:18,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      },
      footer:{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'center',
      }
})

export default Fournisseur;