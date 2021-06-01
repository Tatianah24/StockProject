import React, {Component} from 'react';
import {Modal, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { insertNewFrs, queryAllFrs, updateFrs } from '../databases/allSchemas';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export class MyModal extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            id_frs:0,
            nom_frs:'',
            prenom_frs:'',
            tel_frs:'',
            adresse_frs:'',
            frs_isAddnew:true
        }
    }

    show = () =>{
        this.setState({show:true}); 
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
                    fontWeight:'bold',
                    margin:15
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
                             returnKeyType="next" onChangeText={(text) => this.setState({nom_frs :text})} 
                            value={this.state.nom_frs} autoCorrect={false} placeholder='Nom'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({prenom_frs :text})}
                            value={this.state.prenom_frs} autoCorrect={false} placeholder='Prénoms'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({tel_frs :text})}
                            value={this.state.tel_frs} autoCorrect={false} placeholder='Téléphone'/>
                        </View>
                        <View style={styles.infoContainer}>
                        <TextInput 
                             returnKeyType="next" onChangeText={(text) => this.setState({adresse_frs :text})}
                            value={this.state.adresse_frs} autoCorrect={false} placeholder='Adresse'/>
                        </View>
                        
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.nom_frs.trim()=="" && this.state.tel_frs.trim()=="" && this.state.adresse_frs.trim()==""){
                                alert("Fill the textinput");
                                return;
                            }
                            if(this.state.frs_isAddnew==true){
                                const newFrs = {
                                    id_frs: Math.floor(Date.now()/1000),
                                    nom_frs:this.state.nom_frs,
                                    prenom_frs:this.state.prenom_frs,
                                    tel_frs:this.state.tel_frs,
                                    adresse_frs:this.state.adresse_frs
                                };
                                insertNewFrs(newFrs).then().catch((error) => {
                                    alert (`Insert new frs error ${error}`);
                                  }); 
                                {this.close()}                  
                            }
                            else{
                                
                            }
                        }}>
                            <Text style={styles.txt}>Ajouter</Text>
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