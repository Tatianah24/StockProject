import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Modal, StyleSheet, Image, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {ModalType} from './ModalType';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {Card} from 'react-native-shadow-cards';
import realm, {queryAllType, updateType, deleteType, filterType} from '../databases/allSchemas';

class Type extends Component{
    constructor(props){
        super(props);
        this.state={
            typeLists:[],
            showEdit:false,
            showDetail:false,
            ref_type:0,
            nom_type:'',
            searchType:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllType().then((typeLists) => {
            this.setState({typeLists});
        }).catch((error) => {
            this.setState({typeLists : []});
        });
        console.log(`reloadData`);
    }

    renderContent = ()=>{
        return(
            <View >
               
                    <FlatList 
                        data={this.state.typeLists}
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
                <Text>{item.ref_type}</Text>
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
                            justifyContent:'center',marginHorizontal:30,marginTop:10}}>{item.nom_type}</Text>
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
                                        ref_type:item.ref_type,
                                        nom_type:item.nom_type
                                    })
                                }}>
                                    <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}} />
                                </TouchableOpacity>
                                <Modal
                                    animationType={'fade'}
                                    transparent={true}
                                    visible={this.state.showEdit}
                                    title="Modifier le type">
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
                                             returnKeyType="next" onChangeText={(text) => this.setState({nom_type :text})} 
                                            value={this.state.nom_type} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.ref_type)
                                        const typeList = {
                                            ref_type:this.state.ref_type,
                                            nom_type:this.state.nom_type,
                                        }
                                    updateType(typeList).then().catch(error=>{
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
                                                'Supprimer un type',
                                                [
                                                    {
                                                        text:'Non', onPress:()=>{ },//Do nothing
                                                        style:'Annuler'
                                                    },
                                                    {
                                                        text:'Oui', onPress:()=>{ 
                                                            deleteType(item.ref_type).then().catch(error => {
                                                            alert(`Failed to delete type with ref_type=${item.ref_type}, error=${error}`);
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
                                    title="Liste des articles de ce type">
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
                            <Text style={{color:"white",marginLeft:120,fontSize:20}}>Types</Text>                         
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalType
                                title="Ajouter un type d'article"
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
                        this.setState({searchType: text});
                        filterType(text).then(filteredType =>{
                            this.setState({typeLists: filteredType});
                        }).catch(error => {
                            this.setState({typeLists : [] });
                        });
                        }}
                        value={this.state.searchType}
                        />
                    </View>
                    <View>
                    <FlatList
                            data={this.state.typeLists}
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
        marginLeft:120
    },
    flatList:{
        flex:1,
        flexDirection:'column',
    },
    searchContainer:{
        height: 50,
        borderRadius: 10,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        marginTop: 10
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

export default Type;