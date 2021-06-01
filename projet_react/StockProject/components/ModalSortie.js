import React, {Component} from 'react';
import {Modal, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import realm,{ ARTICLE_SCHEMA, insertSortie, updateArticle } from '../databases/allSchemas';
import moment from 'moment';

export class ModalSortie extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            ref_sortie:0,
            date_sortie:'',
            motif_sortie:'',
            qte_sortie:'',
            article_sortie:'',
            sortie_isAddNew:true
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
    updateQte = ()=>{
        try{
            realm.write(()=>{
                var id = realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article_sortie)
                id.stock_art = id.stock_art - parseInt(this.state.qte_sortie) 
            })
        }
       catch(e){
           console.log(e)
       }
    }
    renderContent = () => {
        const {data} = this.props
        return(
            <View>
                    <View style={styles.contenu}>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({article_sortie :text})} 
                            value={this.state.article_sortie} autoCorrect={false} placeholder='Article demandé'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({motif_sortie :text})}
                            value={this.state.motif_sortie} autoCorrect={false} placeholder='Motif'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({qte_sortie :text})}
                            value={this.state.qte_sortie} autoCorrect={false} placeholder='Quantité'/>
                        </View>     
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.article_sortie.trim()=="" && this.state.motif_sortie.trim()=="" && this.state.qte_sortie.trim()==""){
                                alert("Fill the textinput");
                                return;
                            }
                            if(this.state.sortie_isAddNew==true){
                                const newSortie={
                                    ref_sortie:Math.floor(Date.now()/1000),
                                    //date_sortie:moment(Date.now()).format("YYYY-MM-DD"),
                                    date_sortie:new Date(),
                                    motif_sortie:this.state.motif_sortie,
                                    qte_sortie:parseInt(this.state.qte_sortie),
                                    article_sortie: realm.objects(ARTICLE_SCHEMA).filtered("design_art==$0",this.state.article_sortie)
                                };
                                insertSortie(newSortie).then(this.updateQte()).catch((error)=>{
                                    alert (`Insert new sortie error ${error}`);
                                }); 
                                this.close();
                            }
                        }}>
                            <Text style={styles.txt}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCont} onPress={()=> this.close()}>
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
                    justifyContent:'center'
                }}>
                    {this.renderOutsideTouchable(onTouchOutside)}
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