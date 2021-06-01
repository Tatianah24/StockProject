import React, {Component} from 'react';
import {Modal, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import realm,{ ARTICLE_SCHEMA, insertNewArticle, queryAllArticle, updateArticle,SORTIE_SCHEMA,queryAllFournir} from '../databases/allSchemas';


export class ModalFournir extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            id_fr:0,
            qte_fr:'',
            date_fr:'',
            num_lot_fr:'',
            id_art:'',
            fr_isAddNew:true
        }
    }

    show = () =>{
        this.setState({show:true})
    }

    close = () => {
        this.setState({show:false})
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
                    fontWeight:'500',
                    margin:15
                    }}>
                    {title}
                </Text>
            </View>
        )
    }

    renderContent = () => {
        const {data} = this.props
        //let params = this.props.navigation.state.params.id_frs
        return(
            <View>
                    <View style={styles.contenu}>
                        <View style={styles.infoContainer}>
                        <TextInput onChangeText={(text) => this.setState({article :text})} value={this.state.article}
                         returnKeyType="next" autoCorrect={false} placeholder='Désignation'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput onChangeText={(text) => this.setState({qte_fr :text})} value={this.state.qte_fr}
                         returnKeyType="next" autoCorrect={false} placeholder='Quantité'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput onChangeText={(text) => this.setState({num_lot_fr :text})} value={this.state.num_lot_fr}
                         returnKeyType="next" autoCorrect={false} placeholder='Numéro de lot'/>
                        </View>
                        
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            var design = realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article)[0]
                            if(this.state.article.trim()=="" && this.state.qte_fr.trim()==""){
                                    alert("Fill the textinput");
                                    return;
                                }
                            if(this.state.fr_isAddNew==true){
                                try{
                                    if(design!=""){
                                        const newFr = {
                                            id_fr: Math.floor(Date.now()/1000),
                                            qte_fr:parseInt(this.state.qte_fr),
                                            num_lot_fr:parseInt(this.state.num_lot_fr),
                                            //fournisseur:parseInt(params),
                                            article:realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article),
                                            date_fr:moment(Date.now()).format("YYYY-MM-DD")
                                        }
                                        insertFournir(newFr).then().catch((error) => {
                                            alert (`Insert new article error ${error}`);
                                        }); 
                                    }
                                }
                                catch(e){
                                    console.log(e)
                                }
                            }
                            // console.log(this.state.article)
                            // console.log(design.id_art)
                            // if(this.state.article.trim()=="" && this.state.qte_fr.trim()==""){
                            //     alert("Fill the textinput");
                            //     return;
                            // }
                            //  if(this.state.fr_isAddnew==true){
                            //     try{
                            //         if(design!=null){
                            //             var design_id = design.id_art
                            //             console.log(design_id)
                            //             console.log(design.design_art)
                            //             const newFr = {
                            //                 id_fr: Math.floor(Date.now()/1000),
                            //                 qte_fr:parseInt(this.state.qte_fr),
                            //                 fournisseur:parseInt(params),
                            //                 article:parseInt(design_id),
                            //                 date_fr:moment(Date.now()).format("YYYY-MM-DD")
                            //             };
                            //             insertFournir(newFr).then().catch((error) => {
                            //                 alert (`Insert new article error ${error}`);
                            //               }); 
                            //             // realm.write(()=>{
                            //             //     design[0].qte_art=qte_art + parseInt(qte_fr)
                            //             // })  
                            //         } 
                            //     } 
                            //     catch(e){
                            //         console.log(e)
                            //     }                    
                            //  }
                            // else{
                                
                            // }
                                    }}>
                            <Text style={styles.txt}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCont} onPress={()=> 
                            //queryAllFournir(),
                            this.close()}>
                            <Text style={styles.txt}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                   
            </View>   
        )
    }

    render(){
        let {show} = this.state
        const {onTouchOutside, title} = this.props
        
        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={{
                    flex:1,
                    backgroundColor:'#000000AA',
                    justifyContent:'center',
                    alignItems:'center',
                    width:'100%',
                    
                }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={{
                        backgroundColor:'#FFFFFF',
                        borderTopRightRadius: 10,
                        borderTopLeftRadius:10,
                        borderBottomLeftRadius:10,
                        borderBottomRightRadius:10,
                        margin:20,
                        padding:20,
                        marginTop:0
                    }}>
                       {this.renderTitle()}
                       {this.renderContent()} 
                    </View>
                </View>
            </Modal>
        )
    }
}

export const styles=StyleSheet.create({
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