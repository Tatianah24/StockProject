import React, {Component} from 'react';
import {View, SafeAreaView,StatusBar,TouchableWithoutFeedback, Text,TextInput, FlatList,Modal, StyleSheet, Image, TouchableOpacity, Alert, Button} from 'react-native';
import {ModalArticle} from './ModalArticle';
import Swipeout from 'react-native-swipeout';
import {Picker} from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import realm, {queryAllArticle, deleteArticle, updateArticle,TYPE_SCHEMA, queryAllType,filterArticle,
 queryAllCase,queryAllMonnaie,queryAllCategorie,CASIER_SCHEMA,MONNAIE_SCHEMA,CATEGORIE_SCHEMA, queryAllArt} from '../databases/allSchemas';
Icon.loadFont()

class Article extends Component{
    constructor(props){
        super(props);
        this.state={
            ArticleLists:[],
            showEdit:false,
            showTransfert:false,
            id_art:'',
            design_art:'',
            pu_art:'',
            qte_art:'',
            datelim_art:'',
            codebarre_art:'',
            art_isAddnew:true,
            casLists:[],
            num_cas:'',
            catLists:[],
            monLists:[],
            typeLists:[],
            typeArticle:'',
            casierArticle:'',
            categorieArticle:'',
            monnaieArticle:'',
            searchArticle:''
        };
        
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }
    
    reloadData = () => {
        queryAllArticle().then((ArticleLists) => {
            this.setState({ArticleLists});
        }).catch((error) => {
            this.setState({ArticleLists : []});
        });
        console.log(`reloadData`);
    }

    
    reloadDataCas = () => {
        queryAllCase().then((casLists) => {
            this.setState({casLists});
            
        }).catch((error) => {
            this.setState({casLists : []});
        });
        console.log(`reloadData 1`);
    }

    reloadDataCat = () => {
        queryAllCategorie().then((catLists) => {
            this.setState({catLists});
            
        }).catch((error) => {
            this.setState({catLists : []});
        });
        console.log(`reloadData 2`);
    }

    reloadDataType = () => {
        queryAllType().then((typeLists) => {
            this.setState({typeLists});   
        }).catch((error) => {
            this.setState({typeLists : []});
        });    
        console.log(`reloadData 2`);
    }

    reloadDataMon = () => {
        queryAllMonnaie().then((monLists) => {
            this.setState({monLists});
            
        }).catch((error) => {
            this.setState({monLists : []});
        });
        console.log(`reloadData 3`);
    }
    renderItem = ({item, index}) => {
        return(
                <View>
                    <Card style={styles.itemCard}>
                        <View style={{marginTop:15}}>
                            <View style={{marginLeft:300,backgroundColor:'silver',width:35,height:35,borderRadius:35}}>
                            <TouchableOpacity onPress={()=>{
                                console.log(item.id_art)
                                this.props.navigation.navigate("Inventaire",{id_art:item.id_art})
                            }}>
                                <Ionicons name="clipboard" size={25} color="white" style={{alignSelf:'center',marginTop:3,marginLeft:2}}/>
                            </TouchableOpacity>
                            </View>
                            <Text style={styles.itemText,{fontWeight:'bold',fontSize:18,marginLeft:20}}>{item.design_art}</Text> 
                            <Text style={styles.itemText,{marginLeft:20}}>CB: {item.codebarre_art}</Text>
                            <Text style={styles.itemText,{marginLeft:20}}>Quantité: {item.qte_art}</Text> 
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between'
                            }}>
                            <Text style={styles.itemText,{marginLeft:20,fontWeight:'bold',fontSize:18}}>PU: {item.pu_art}</Text>
                            <View style={{
                                    marginRight:10,
                                    marginTop:-15,
                                    height:45,
                                    width:120,
                                    borderRadius:20,
                                    backgroundColor:'#03999C',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                        <TouchableOpacity onPress={()=>{
                                        //queryAllArt()
                                        console.log(item.categorieArticle.libelle_cat)
                                        this.reloadDataCat()
                                        this.reloadDataMon()
                                        this.reloadDataType()
                                        this.setState({showEdit:true,
                                        id_art:item.id_art,
                                        design_art:item.design_art,
                                        codebarre_art:item.codebarre_art,
                                        pu_art:item.pu_art.toString(),
                                        qte_art:item.qte_art.toString(),
                                        typeArticle:item.typeArticle.nom_type,
                                        categorieArticle:item.categorieArticle.libelle_cat,
                                        monnaieArticle:item.monnaieArticle.type_monnaie,
                                        })}}>
                                            <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                            //var l = item.casierArticle.num_cas
                                            //console.log(parseInt(l))
                                            console.log(item.casierArticle)
                                    Alert.alert(
                                        'Supprimer',
                                        'Supprimer un article',
                                    [
                                        {
                                            text:'Non', onPress:()=>{ },//Do nothing
                                            style:'Annuler'
                                        },
                                        {
                                            text:'Oui', onPress:()=>{ 
                                            deleteArticle(item.id_art).then().catch(error => {
                                            alert(`Failed to delete Frs with id_art=${item.id_art}, error=${error}`);
                                        })
                                        },
                                        },
                                    ],
                            {cancelable:true}
                                    );}}>
                                            <Ionicons name="trash-sharp" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                            this.reloadDataCas()
                                            this.setState({showTransfert:true})
                                        }}>
                                            <Ionicons name="arrow-forward-circle-sharp" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        
                                    </View>    
                            </View>  
                        </View>
                        </View>
                    </Card>
                    {/* Modal Modifier */}
                    <Modal
                             animationType={'fade'}
                            transparent={true}
                            visible={this.state.showEdit}
                            title="Modifier un article"
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
                                     returnKeyType="next" onChangeText={(text) => this.setState({design_art :text})} 
                                    value={this.state.design_art} autoCorrect={false}/>
                                </View>
                               <View style={styles.infoContainer}>
                               <TextInput 
                                     returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({codebarre_art :text})}
                                    value={this.state.codebarre_art} autoCorrect={false}/>
                               </View>
                                <View style={{ flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'center'}}>
                                    <TextInput 
                                        style={styles.textinput,{width:80}} returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({pu_art :text})}
                                        value={this.state.pu_art} autoCorrect={false} placeholder='Prix unitaire'/>
                                <Picker style={{width:'50%'}}
                                    selectedValue={this.state.monnaieArticle}
                                    defaultValue={item.monnaieArticle.type_monnaie}
                                    onValueChange={(itemValue)=>{this.setState({monnaieArticle:itemValue})}}>
                                {
                                    this.state.monLists.map( (v,i)=>{
                                    var money=v.type_monnaie
                                    var id = v.ref_monnaie
                                return (
                                    <Picker.Item label={money} value={id} key="{v.id}" />
                                    )
                                }
                                )}
                                </Picker>
                            </View>
                            <View style={styles.infoContainer}>
                            <TextInput 
                                 returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({qte_art :text})}
                                value={this.state.qte_art} autoCorrect={false}/>
                            </View>
                            {/* Picker Type */}
                        <Picker style={{width:'80%'}}
                                    selectedValue={this.state.typeArticle}
                                    onValueChange={(itemValue)=>{this.setState({typeArticle:itemValue})}}>
                                {
                                    this.state.typeLists.map( (v,i)=>{
                                    var tp=v.nom_type
                                    var ref = v.ref_type
                                    //console.log(cat)
                                return (
                                    <Picker.Item label={tp} value={ref} key="{v.ref}" />
                                    )
                                }
                            )}
                            </Picker>
                            {/* picker catégorie */}
                            <Picker style={{width:'80%'}}
                                    selectedValue={this.state.categorieArticle}
                                    onValueChange={(itemValue)=>{this.setState({categorieArticle:itemValue})}}>
                                {
                                    this.state.catLists.map( (v,i)=>{
                                    var cat=v.libelle_cat
                                    var ref = v.ref_cat
                                return (
                                    <Picker.Item label={cat} value={ref} key="{v.ref}" />
                                    )
                                }
                            )}
                            </Picker>
                                </View>
                                <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.design_art)
                                        try{
                                            const artList = {
                                                id_art: Math.floor(Date.now()/1000),
                                                design_art:this.state.design_art,
                                                codebarre_art:this.state.codebarre_art,
                                                pu_art:parseInt(this.state.pu_art),
                                                qte_art:parseInt(this.state.qte_art),
                                                //casierArticle:realm.objects(CASIER_SCHEMA).filtered("id_cas==$0",parseInt(this.state.casierArticle)),
                                                typeArticle:realm.objects(TYPE_SCHEMA).filtered("ref_type==$0",parseInt(this.state.typeArticle)),
                                                monnaieArticle:realm.objects(MONNAIE_SCHEMA).filtered("ref_monnaie==$0",parseInt(this.state.monnaieArticle)),
                                                categorieArticle:realm.objects(CATEGORIE_SCHEMA).filtered("ref_cat==$0",parseInt(this.state.categorieArticle)),
                                                //datelim_art: moment(Date.now()).format("YYYY-MM-DD")
                                            }
                                            updateArticle(artList).then().catch(error=>{
                                                //alert(`Failed to update Article with id_art=${item.id_art}, error=${error}`);
                                                console.log(error)
                                            });
                                            console.log(this.state.design_art)
                                            this.setState({showEdit:false});
                                        }
                                        catch(e){
                                            console.log(e)
                                        }
                                        
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
                        {/* Modal Transfert */}
                        <Modal
                             animationType={'fade'}
                            transparent={true}
                            visible={this.state.showTransfert}
                            title="Transférer un article"
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
                                <Text style={{fontSize:18,fontWeight:'bold'}}>Transférer du casier:</Text>
                               <View style={styles.infoContainer}>
                               <TextInput 
                                     returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({codebarre_art :text})}
                                    value={this.state.codebarre_art} autoCorrect={false} placeholder="Numéro du casier"/>
                               </View>
                            <View style={styles.infoContainer}>
                            <TextInput 
                                 returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({qte_art :text})}
                                value={this.state.qte_art} autoCorrect={false} placeholder="Quantité à transférer"/>
                            </View>
                            <Text style={{fontSize:18,fontWeight:'bold'}}>Vers le casier:</Text>
                            <Picker style={{width:'80%'}}
                                    selectedValue={this.state.casierArticle}
                                    onValueChange={(itemValue)=>{this.setState({casierArticle:itemValue})}}>
                                {
                                    this.state.casLists.map( (v,i)=>{
                                    var cas=v.num_cas.toString()
                                    var ref = v.id_cas
                                return (
                                    <Picker.Item label={cas} value={ref} key="{v.id_cas}" />
                                    )
                                }
                            )}
                            </Picker>
                                </View>
                                <View style={styles.footer}>
                                    <TouchableOpacity style={styles.buttonCont} onPress={() => {
                                        console.log(item.design_art)
                                        try{
                                            const artList = {
                                                id_art: Math.floor(Date.now()/1000),
                                                casierArticle:realm.objects(CASIER_SCHEMA).filtered("id_cas==$0",parseInt(this.state.casierArticle)),
                                                datelim_art: moment(Date.now()).format("YYYY-MM-DD")
                                            }
                                            console.log(this.state.design_art)
                                            this.setState({showEdit:false});
                                        }
                                        catch(e){
                                            console.log(e)
                                        }
                                        
                                    }}>
                                        <Text style={styles.txt,{marginLeft:15,fontSize:18,color:"white"}}>Transférer</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonCont} onPress={()=> this.setState({showTransfert:false})}>
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
                            <TouchableOpacity style={{alignItems:'flex-start',margin:16}} >
                                <AntDesign name="menu-fold" size={40} color="white" style={{marginLeft:20}} onPress={()=>{
                                    queryAllArt()
                                }}/>   
                            </TouchableOpacity>
                            <Text style={{color:"white",marginLeft:80,fontSize:20}}>Articles</Text>                         
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalArticle
                                title='Ajouter un article'
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
                        this.setState({searchArticle: text});
                        filterArticle(text).then(filteredArticle =>{
                            this.setState({ArticleLists: filteredArticle});
                        }).catch(error => {
                            this.setState({ArticleLists : [] });
                        });
                        }}
                        value={this.state.searchArticle}
                        />
                    </View>
                    <View>
                        <FlatList
                            data={this.state.ArticleLists}
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
        width: 350,
        borderRadius: 10,
        //flex:1,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        marginTop: 20,
        marginLeft:10
    },
    itemCard:{
        height:150,
        width:350,
        marginHorizontal:10,
        marginBottom:10,
        marginTop:15,
        borderRadius:15,
        elevation:13,
        backgroundColor:'white'
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
          alignItems:'center',
          //marginLeft:50
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

export default Article;