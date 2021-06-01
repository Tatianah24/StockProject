import React, {Component} from 'react';
import {Modal, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import realm,{ insertNewArticle, queryAllCategorie,queryAllCase, CASIER_SCHEMA, ARTICLE_SCHEMA,CATEGORIE_SCHEMA,MONNAIE_SCHEMA,queryAllMonnaie, TYPE_SCHEMA,queryAllType} from '../databases/allSchemas';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

export class ModalArticle extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            id_art:0,
            design_art:'',
            pu_art:'',
            qte_art:'',
            datelim_art:'',
            codebarre_art:'',
            num_lot_art:'',
            art_isAddnew:true,
            casLists:[],
            catLists:[],
            monLists:[],
            typeLists:[],
            typeArticle:'',
            casierArticle:'',
            categorieArticle:'',
            monnaieArticle:'',
        }
        // this.reloadData();
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
             
        // try{
        //     console.log(this.state.casLists)
        //     this.state.casLists.map( (v)=>{
        //         console.log("ato anaty reloadData 1"+v.num_cas);
        //       }) 
        // }
        // catch(e){
        //     console.log('erreur'+e)
        // }
        console.log(`reloadData 1`);
    }

    reloadDataCat = () => {
        queryAllCategorie().then((catLists) => {
            this.setState({catLists});
            
        }).catch((error) => {
            this.setState({catLists : []});
        });
             
        // try{
        //     console.log(this.state.catLists)
        //     this.state.catLists.map( (v)=>{
        //         console.log("ato anaty reloadData 2"+v.libelle_cat);
        //       }) 
        // }
        // catch(e){
        //     console.log('erreur'+e)
        // }
        console.log(`reloadData 2`);
    }

    reloadDataType = () => {
        queryAllType().then((typeLists) => {
            this.setState({typeLists});   
        }).catch((error) => {
            this.setState({typeLists : []});
        });    
        // try{
        //     console.log(this.state.typeLists)
        //     this.state.typeLists.map( (v)=>{
        //         console.log("ato anaty reloadData 2"+v.nom_type);
        //       }) 
        // }
        // catch(e){
        //     console.log('erreur'+e)
        // }
        console.log(`reloadData 2`);
    }
    reloadDataMon = () => {
        queryAllMonnaie().then((monLists) => {
            this.setState({monLists});
            
        }).catch((error) => {
            this.setState({monLists : []});
        });
             
        // try{
        //     console.log(this.state.monLists)
        //     this.state.monLists.map( (v)=>{
        //         console.log("ato anaty reloadData 3"+v.type_monnaie);
        //       }) 
        // }
        // catch(e){
        //     console.log('erreur'+e)
        // }
        console.log(`reloadData 3`);
    }
    show = () =>{
        this.setState({show:true})
        this.reloadData();
        this.reloadDataCat();
        this.reloadDataMon();
        this.reloadDataType();
    }

    close = () => {
        this.setState({show:false,
        casLists:[],catLists:[],monLists:[],typeLists:[]})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex:1, width:'100%'}}/>
        if(!onTouch) return view

        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}}>
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View>
                <Text style={{
                    color:'#182E44',
                    fontSize:20,
                    fontWeight:'bold',
                    margin:5,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props

        return(
            <View>
                    <View style={styles.contenu}>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({design_art :text})} 
                            value={this.state.design_art} autoCorrect={false} placeholder='Désignation'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({codebarre_art :text})}
                            value={this.state.codebarre_art} autoCorrect={false} placeholder='Code barre'/>
                        </View>
                        {/* <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({num_lot_art :text})} 
                            value={this.state.num_lot_art} autoCorrect={false} placeholder='Numéro de lot'/>
                        </View> */}
                        <View style={{ flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'center'}}>
                            <TextInput 
                                style={styles.textinput,{width:80}} returnKeyType="next" keyboardType="numeric" onChangeText={(text) => this.setState({pu_art :text})}
                                value={this.state.pu_art} autoCorrect={false} placeholder='Prix unitaire'/>
                            {/* Picker Monnaie */}
                            <Picker style={{width:'50%'}}
                                    selectedValue={this.state.monnaieArticle}
                                    onValueChange={(itemValue)=>{this.setState({monnaieArticle:itemValue})}}>
                                {
                                    this.state.monLists.map( (v,i)=>{
                                    var money=v.type_monnaie
                                    var id = v.ref_monnaie
                                    //console.log(money)
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
                            value={this.state.qte_art} autoCorrect={false} placeholder='Quantité'/>
                        </View>
                        {/* Picker Type */}
                        <Picker style={{width:'80%'}}
                                    selectedValue={this.state.typeArticle}
                                    onValueChange={(itemValue)=>{this.setState({typeArticle:itemValue})}}>
                                {
                                    this.state.typeLists.map( (v,i)=>{
                                    var tp=v.nom_type
                                    var ref = v.ref_type
                                    //console.log(tp)
                                return (
                                    <Picker.Item label={tp} value={ref} key="{v.ref}" />
                                    )
                                }
                            )}
                            </Picker>
                            {/* Picker catégorie */}
                        <Picker style={{width:'80%'}}
                                    selectedValue={this.state.categorieArticle}
                                    onValueChange={(itemValue)=>{this.setState({categorieArticle:itemValue})}}>
                                {
                                    this.state.catLists.map( (v,i)=>{
                                    var cat=v.libelle_cat
                                    var ref = v.ref_cat
                                    //console.log(cat)
                                return (
                                    <Picker.Item label={cat} value={ref} key="{v.ref}" />
                                    )
                                }
                            )}
                            </Picker>
                            <Picker style={{width:'80%'}}
                                    selectedValue={this.state.casierArticle}
                                    onValueChange={(itemValue)=>{this.setState({casierArticle:itemValue})}}>
                                {
                                    this.state.casLists.map( (v,i)=>{
                                    var id_cas=v.id_cas
                                    var num_cas = v.num_cas.toString()
                                    //console.log(num_cas)
                                return (
                                    <Picker.Item label={num_cas} value={id_cas} key="{v.id_cas}" />
                                    )
                                }
                            )}
                            </Picker>
                        
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.art_isAddnew==true){
                                try{
                                    const newArt = {
                                        id_art:Math.floor(Date.now()/1000),
                                        design_art:this.state.design_art,
                                        codebarre_art:this.state.codebarre_art,
                                        pu_art:parseInt(this.state.pu_art),
                                        qte_art:parseInt(this.state.qte_art),
                                        num_lot_art:realm.objects(ARTICLE_SCHEMA).sorted('num_lot_art', true).length > 0
                                        ? realm.objects(ARTICLE_SCHEMA).sorted('num_lot_art', true)[0]
                                            .num_lot_art + 1 : 1,
                                        datelim_art:moment(Date.now()).format("YYYY-MM-DD"),
                                        typeArticle:realm.objects(TYPE_SCHEMA).filtered("ref_type==$0",parseInt(this.state.typeArticle)),
                                        casierArticle: realm.objects(CASIER_SCHEMA).filtered("id_cas==$0",parseInt(this.state.casierArticle)),
                                        categorieArticle: realm.objects(CATEGORIE_SCHEMA).filtered("ref_cat==$0",parseInt(this.state.categorieArticle)),
                                        monnaieArticle: realm.objects(MONNAIE_SCHEMA).filtered("ref_monnaie==$0",parseInt(this.state.monnaieArticle))
                                    }
                                        //console.log(realm.objects(MONNAIE_SCHEMA).filtered("ref_monnaie==$0",parseInt(this.state.monnaieArticle)))
                                    //console.log(realm.objects(CATEGORIE_SCHEMA).filtered("ref_cat==$0",parseInt(this.state.categorieArticle)))
                                    insertNewArticle(newArt).then().catch((error) => {
                                        alert (`Insert new article error ${error}`);
                                      });
                                      {this.close()} 
                                }
                                catch(e){
                                    console.log("modal"+e)
                                }                   
                            }
                        }}>
                            <Text style={styles.txt}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCont} onPress={()=> {
                             this.close()
                        }}>
                            <Text style={styles.txt}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                   
            </View>   
        )
    }

    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        // var view="";
        // if(this.state.casLists!=""){

        //    view=<Picker style={{width:'100%'}}
        //                 selectedValue={this.state.casierArticle}
        //                 onValueChange={(itemValue)=>{this.setState({casierArticle:itemValue})}}
        //    >{
        //     this.state.casLists.map( (v,i)=>{
        //        var a=realm.objects(ARTICLE_SCHEMA)
        //        var myJson = JSON.stringify(a)
        //        console.log(myJson)
        //         var num=v.num_cas.toString()
        //         console.log(num)
        //         return (
                  
        //                 <Picker.Item label={num} value={num} key="{v.num_cas}" />
        //         )
        //        }
        //    )}
        //    </Picker>  
        // }
        // else{

        //  view=console.log('tsisy e'+ this.state.casLists) 
        // }
        return(
                <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}>
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'center'}}>
                {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor:'#FFFFFF',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10,
                        margin:30,
                        padding:30,
                        marginTop:0,}}>
                    {this.renderTitle()}
                    {this.renderContent()} 
                    </View>
                </View>
            </Modal>
        )
    }
}

export const styles=StyleSheet.create({
    textinput:{
        height:50,
        marginLeft:0,
        borderBottomWidth:3,
        borderColor:'#116BFF',
        width:200,
        marginTop:10,
        fontSize:16,
        alignItems:'center',
        justifyContent:'center',
    },
    contenu:{
        alignItems:'center',
        justifyContent:'center'
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