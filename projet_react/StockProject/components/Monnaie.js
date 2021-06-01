import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Modal, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {ModalMonnaie} from './ModalMonnaie';
import Swipeout from 'react-native-swipeout';
import {Card} from 'react-native-shadow-cards';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import realm, {filterMonnaie, queryAllMonnaie,updateMonnaie} from '../databases/allSchemas';

class Monnaie extends Component{
    constructor(props){
        super(props);
        this.state={
            monLists:[],
            showEdit:false,
            ref_monnaie:0,
            type_monnaie:'',
            searchMonnaie:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllMonnaie().then((monLists) => {
            this.setState({monLists});
        }).catch((error) => {
            this.setState({monLists : []});
        });
        console.log(`reloadData`);
    }

    renderItem = ({item, index}) => {
        //var article= realm.objects(ARTICLE_SCHEMA).filtered("casierArticle==$0",item.casierArticle)
        return(
                        <View>
                            <Card style={styles.itemCard}>
                            <Text style={styles.itemText,{fontWeight:'bold',fontSize:20,alignItems:'center',
                            justifyContent:'center',marginHorizontal:30,marginTop:10}}>{item.type_monnaie}</Text>
                            <View style={{
                                    marginRight:10,
                                    marginTop:20,
                                    marginLeft:60,
                                    height:45,
                                    width:100,
                                    borderRadius:20,
                                    backgroundColor:'#03999C',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                            <View style={{flexDirection:'row', 
                                        justifyContent:'center',
                                        alignItems:'center',}}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        showEdit:true,
                                        ref_monnaie:item.ref_monnaie,
                                        type_monnaie:item.type_monnaie
                                    })
                                }}>
                                    <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                                <Modal
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.showEdit}
                                    title="Modifier le numéro du casier">
                                        <View
                                         style={{
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
                                        <View style={styles.infoContainer}>
                                            <TextInput 
                                             returnKeyType="next" onChangeText={(text) => this.setState({type_monnaie :text})} 
                                            value={this.state.type_monnaie} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.ref_monnaie)
                                        const casList = {
                                            ref_monnaie:this.state.ref_monnaie,
                                            type_monnaie:this.state.type_monnaie,
                                        }
                                    updateMonnaie(casList).then().catch(error=>{
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
                                <TouchableOpacity onPress={()=>{
                                    Alert.alert(
                                        'Supprimer',
                                                'Supprimer une monnaie',
                                                [
                                                    {
                                                        text:'Non', onPress:()=>{ },//Do nothing
                                                        style:'Annuler'
                                                    },
                                                    {
                                                        text:'Oui', onPress:()=>{ 
                                                            deleteMonnaie(item.ref_monnaie).then().catch(error => {
                                                            alert(`Failed to delete Monnaie with ref_monnaie=${item.ref_monnaie}, error=${error}`);
                                                            })
                                                        },
                                                    },
                                                ],
                                            {cancelable:true}
                                    )
                                }}>
                                <Ionicons name="trash-sharp" size={30} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                            </View> 
                            </View> 
                            </Card>
                             
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
                            <Text style={{color:"white",marginLeft:120,fontSize:20}}>Monnaie</Text>                         
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalMonnaie
                                title='Ajouter un monnaie'
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
                        this.setState({searchMonnaie: text});
                        filterMonnaie(text).then(filteredMon =>{
                            this.setState({monLists: filteredMon});
                        }).catch(error => {
                            this.setState({monLists : [] });
                        });
                        }}
                        value={this.state.searchMonnaie}
                        />
                    </View>
                    <View>
                    <FlatList
                            data={this.state.monLists}
                            numColumns={2}
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
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#0E638B',
        height:100,
        margin:0,
        width:'100%'
    },
    content:{
        flex:1,
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white',
        marginLeft:100
    },
    searchContainer:{
        height: 50,
        width:350,
        borderRadius: 10,
        //flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        marginTop: 10,
        marginLeft:20
    },
    flatList:{
        flex:1,
        flexDirection:'column',
    },
    itemStyle:{
        backgroundColor:'silver',
        alignItems:'center',
        justifyContent:'center',
        height:120,
        margin:1,
        flex:1,
        width:400,
        
    },
    itemText:{
        fontSize:18,

    },
    inputsearch:{
      height: 40,
      padding: 10,
      margin: 10,
      borderColor:'gray',
      borderWidth:1  
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
        marginHorizontal:10
      },
      itemCard:{
        height:120,
        width:170,
        marginHorizontal:10,
        marginBottom:10,
        marginTop:15,
        borderRadius:20,
        elevation:13,
        backgroundColor:'white'
      },
      txt:{
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        fontSize:18,
        marginLeft:30
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
          alignItems:'center',
          justifyContent:'center',
          flexDirection:'row'
      }
})

export default Monnaie;