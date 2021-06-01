import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Dimensions, StyleSheet, Image, TouchableOpacity, Alert, Modal} from 'react-native';
import {ModalCasier} from './ModalCasier';
import Swipeout from 'react-native-swipeout';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import realm, {ARTICLE_SCHEMA, queryAllCase,updateCasier,deleteCasier} from '../databases/allSchemas';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Card} from 'react-native-shadow-cards';

const numColumn=2
const WIDTH = Dimensions.get('window').width
class Casier extends Component{
    constructor(props){
        super(props);
        this.state={
            casLists:[],
            showEdit:false,
            showDetail:false,
            id_cas:'',
            num_cas:'',
            searchText:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllCase().then((casLists) => {
            this.setState({casLists});
        }).catch((error) => {
            this.setState({casLists : []});
        });
        console.log(`reloadData`);
    }

renderContent = ()=>{
    //artListe= realm.objects()
    return(
        <View >
           
                <FlatList 
                    data={this.state.casLists}
                    showsVerticalScrollIndicator={false}
                    renderItem={this.renderItemContent}
                    keyExtractor={(item, index) => index.toString()}
                    onPressItem={()=>{
                    console.log("pressed");}}
                />
        <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonCont} onPress={()=>{
                this.setState({showDetail:false})
            }}>
                <Text style={styles.txt}>Fermer</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

renderItemContent = ({item,index})=>{
    return(
        <View>
            <Text>{item.id_cas}</Text>
            <Text>Bonjour</Text>
            
        </View>
    )
}

    renderItem = ({item, index}) => {
        //var article= realm.objects(ARTICLE_SCHEMA).filtered("casierArticle==$0",item.casierArticle)
        return(
                        <View>
                            <Card style={styles.itemCard}>
                            <Text style={{fontWeight:'bold',fontSize:20,alignItems:'center',
                            justifyContent:'center',marginHorizontal:30,marginTop:10}}>C{item.num_cas}</Text>
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
                                        id_cas:item.id_cas,
                                        num_cas:item.num_cas.toString()
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
                                             returnKeyType="next" onChangeText={(text) => this.setState({num_cas :text})} 
                                            value={this.state.num_cas} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.id_cas)
                                        const casList = {
                                            id_cas:this.state.id_cas,
                                            num_cas:this.state.num_cas,
                                        }
                                    updateCasier(casList).then().catch(error=>{
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
                                                'Supprimer un casier',
                                                [
                                                    {
                                                        text:'Non', onPress:()=>{ },//Do nothing
                                                        style:'Annuler'
                                                    },
                                                    {
                                                        text:'Oui', onPress:()=>{ 
                                                            deleteCasier(item.id_cas).then().catch(error => {
                                                            alert(`Failed to delete Article with id_art=${item.id_cas}, error=${error}`);
                                                            })
                                                        },
                                                    },
                                                ],
                                            {cancelable:true}
                                    )
                                }}>
                                <Ionicons name="trash-sharp" size={30} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                               <TouchableOpacity  onPress={()=>{
                                        this.setState({
                                            showDetail:true
                                        })
                                    }}>
                               <Entypo name="dots-three-vertical" size={25} color="white"/>
                               </TouchableOpacity>
                                <Modal  
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.showDetail}
                                    title="Liste des articles dans ce casier">
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
                                           {this.renderContent()}
                                            </View>
                                        </View>
                                </Modal>
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
                            <Text style={{color:"white",marginLeft:120,fontSize:20}}>Casiers</Text>                         
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalCasier
                                title='Ajouter un casier'
                                ref={(target) => popupRef = target}
                                onTouchOutside={onClosePopup}
                            />
                        </SafeAreaView>
                </View>
                <View style={styles.content}>
                    <FlatList
                            data={this.state.casLists}
                            showsVerticalScrollIndicator={false}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            onPressItem={()=>{
                                console.log("pressed");}}
                            numColumns={numColumn}/>
                   
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
        flex:1,
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white',
        marginLeft:100
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
        //marginHorizontal:50
      },
      txt:{
        color:'white',
        alignItems:'center',
        justifyContent:'center',
        fontSize:18,
        marginLeft:30
      },
      footer:{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center'
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
})

export default Casier;