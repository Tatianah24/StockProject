import React, {Component} from 'react';
import {View, Text, StatusBar, SafeAreaView, TouchableWithoutFeedback, Image, StyleSheet, FlatList,TouchableOpacity,
Alert,Modal,TextInput} from 'react-native';
import {ModalSortie} from './ModalSortie';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {Card} from 'react-native-shadow-cards';
import realm,{ARTICLE_SCHEMA,insertSortie,updateSortie,deleteSortie,queryAllSortie} from '../databases/allSchemas';

class sortie extends Component{
    constructor(props){
        super(props);
        this.state = {
           sortieList:[],
           showEdit:false,
           showModalR:false,
           article_sortie:'',
           motif_sortie:'',
           qte_sortie:'',
           anc_qte_sortie:'',
           re_qte_sortie:''
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData();
        });
    }

    reloadData = () => {
        queryAllSortie().then((sortieList) => {
            this.setState({sortieList});
        }).catch((error) => {
            this.setState({sortieList : []});
        });
        console.log(`reloadData`);
    }

    renderItem=({item,index})=>{
        return(
            <View>
                <Card>
                    <View style={styles.itemCard}>
                        <Text style={{alignItems:'center',fontWeight:'bold',fontSize:16,marginLeft:15}}>{item.article_sortie.design_art}</Text>
                        <Text style={{alignItems:'center',fontSize:16,marginLeft:15,marginTop:10}}>Motif:{" "+item.motif_sortie}</Text>
                        {/* <Text style={{alignItems:'center',fontWeight:'bold',fontSize:16,marginLeft:15}}>{item.date_sortie}</Text> */}
                        <Text style={{alignItems:'center',fontSize:16,marginLeft:15}}>Quantité demandé:{" "+item.qte_sortie}</Text>
                        <View style={{
                                    marginLeft:220,
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
                                            console.log(item.article_sortie.design_art)
                                            this.setState({showEdit:true,
                                            article_sortie:item.article_sortie.design_art,
                                            motif_sortie:item.motif_sortie,
                                            qte_sortie:item.qte_sortie.toString(),
                                            anc_qte_sortie:item.qte_sortie.toString()})
                                        }}>
                                            <Ionicons name="ios-pencil" size={30} color="white" style={{marginLeft:5}}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                             Alert.alert(
                                                'Supprimer',
                                                'Etes-vous sûr de supprimer cette demande?',
                                            [
                                                {
                                                    text:'Non', onPress:()=>{ },//Do nothing
                                                    style:'Annuler'
                                                },
                                                {
                                                    text:'Oui', onPress:()=>{ 
                                                    deleteSortie(item.ref_sortie).then().catch(error => {
                                                    alert(`Failed to delete Sortie with id_art=${item.ref_sortie}, error=${error}`);
                                                })
                                                },
                                                },
                                            ],
                                    {cancelable:true}
                                            );
                                        }}>
                                            <Ionicons name="trash-sharp" size={30} color="white" style={{marginLeft:5}}/>   
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>{
                                            Alert.alert(
                                                'Réintégration',
                                                'Etes-vous sûr de réintégrer ces articles?',
                                            [
                                                {
                                                    text:'Non', onPress:()=>{ },//Do nothing
                                                    style:'Annuler'
                                                },
                                                {
                                                    text:'Oui', onPress:()=>{ 
                                                    deleteSortie(item.ref_sortie).then().catch(error => {
                                                    alert(`Failed to delete Sortie with id_art=${item.ref_sortie}, error=${error}`);
                                                    });
                                                    realm.write(()=>{
                                                        var id = realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",item.article_sortie.id_art)
                                                        id.stock_art = id.stock_art + parseInt(item.qte_sortie)
                                                    });
                                                },
                                                },
                                            ],
                                    {cancelable:true}
                                            );
                                        }}>
                                            <Ionicons name="repeat" size={30} color="white" style={{marginLeft:5}}/>  
                                        </TouchableOpacity>
                                    </View>
                        </View>
                        {/* Modal Modifier */}
                        <Modal  
                            animationType={'fade'}
                            transparent={true}
                            visible={this.state.showEdit}
                            title="Modifier la demande de sortie">
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
                                                returnKeyType="next" onChangeText={(text) => this.setState({article_sortie :text})} 
                                                value={this.state.article_sortie} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <TextInput 
                                                returnKeyType="next" onChangeText={(text) => this.setState({motif_sortie :text})}
                                                value={this.state.motif_sortie} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <TextInput 
                                                returnKeyType="next" onChangeText={(text) => this.setState({qte_sortie :text})}
                                                value={this.state.qte_sortie} autoCorrect={false}/>
                                        </View>
                                        <View style={styles.footer}>
                                        <TouchableOpacity style={styles.buttonCont} onPress={()=>{
                                            const sortList = {
                                                ref_sortie:this.state.ref_sortie,
                                                motif_sortie:this.state.motif_sortie,
                                                qte_sortie:parseInt(this.state.qte_sortie),
                                                article_sortie:realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article_sortie)
                                            };
                                            updateSortie(sortList).then().catch((error)=>{
                                                console.log(error)
                                            });
                                            realm.write(()=>{
                                                var nouv_qte_sortie= qte_sortie - parseInt(anc_qte_sortie)
                                                var id = realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article_sortie)
                                                id.stock_art = id.stock_art - parseInt(nouv_qte_sortie) 
                                            })
                                            this.setState({showEdit:false})
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
                </Card>
            </View>
        )
    }

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
                            <Text style={{color:"white",marginLeft:80,fontSize:20}}>Sortie d'article</Text>                          
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalSortie
                                title='Ajouter un article'
                                ref={(target) => popupRef = target}
                                onTouchOutside={onClosePopup}
                            />
                        </SafeAreaView>
                </View>
                <View style={styles.content}>
                    <FlatList
                        data={this.state.sortieList}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                            onPressItem={()=>{
                                console.log("pressed");
                        }}/>
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
})
export default sortie;