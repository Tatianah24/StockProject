import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Modal, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {ModalCategorie} from './ModalCategorie';
import Swipeout from 'react-native-swipeout';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {Card} from 'react-native-shadow-cards';
import realm, {filterCategorie, queryAllCategorie, updateCategorie} from '../databases/allSchemas';

class Categorie extends Component{
    constructor(props){
        super(props);
        this.state={
            catLists:[],
            showEdit:false,
            showDetail:false,
            ref_cat:0,
            libelle_cat:'',
            searchCat:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllCategorie().then((catLists) => {
            this.setState({catLists});
        }).catch((error) => {
            this.setState({catLists : []});
        });
        console.log(`reloadData`);
    }

    renderContent = ()=>{
        return(
            <View >
               
                    <FlatList 
                        data={this.state.catLists}
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
                <Text>{item.ref_cat}</Text>
                <Text>Bonjour</Text>
            </View>
        )
    }
    renderItem = ({item, index}) => {
        //var article= realm.objects(ARTICLE_SCHEMA).filtered("casierArticle==$0",item.casierArticle)
        return(
                        <View>
                            <Card style={styles.itemCard}>
                            <Text style={styles.itemText,{fontWeight:'bold',fontSize:20,alignItems:'center',
                            justifyContent:'center',marginHorizontal:30,marginTop:10}}>{item.libelle_cat}</Text>
                            <View style={{
                                    marginRight:10,
                                    marginTop:20,
                                    marginLeft:230,
                                    marginBottom:10,
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
                                        ref_cat:item.ref_cat,
                                        libelle_cat:item.libelle_cat
                                    })
                                }}>
                                    <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                                <Modal
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.showEdit}
                                    title="Modifier le catégorie">
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
                                             returnKeyType="next" onChangeText={(text) => this.setState({libelle_cat :text})} 
                                            value={this.state.libelle_cat} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.ref_cat)
                                        const casList = {
                                            ref_cat:this.state.ref_cat,
                                            libelle_cat:this.state.libelle_cat,
                                        }
                                    updateCategorie(casList).then().catch(error=>{
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
                                                'Supprimer un catégorie',
                                                [
                                                    {
                                                        text:'Non', onPress:()=>{ },//Do nothing
                                                        style:'Annuler'
                                                    },
                                                    {
                                                        text:'Oui', onPress:()=>{ 
                                                            deleteMonnaie(item.ref_cat).then().catch(error => {
                                                            alert(`Failed to delete Monnaie with ref_cat=${item.ref_cat}, error=${error}`);
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
                                    title="Liste des articles dans ce catégorie">
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
                            <Text style={{color:"white",marginLeft:120,fontSize:20}}>Catégories</Text>                         
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalCategorie
                                title="Ajouter un catégorie d'article"
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
                        this.setState({searchCat: text});
                        filterCategorie(text).then(filteredCat =>{
                            this.setState({catLists: filteredCat});
                        }).catch(error => {
                            this.setState({catLists : [] });
                        });
                        }}
                        value={this.state.searchCat}
                        />
                    </View>
                    <View>
                    <FlatList
                            data={this.state.catLists}
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
    searchContainer:{
        height: 50,
        width:350,
        marginLeft:20,
        borderRadius: 10,
        //flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        marginTop: 10
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white',
        marginLeft:100
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
      footer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
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

export default Categorie;