import React, {Component} from 'react';
import {Modal, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity} from 'react-native';
import realm,{ insertMonnaie, MONNAIE_SCHEMA, queryAllMonnaie,queryAllMon} from '../databases/allSchemas';


export class ModalMonnaie extends Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            ref_monnaie:0,
            type_monnaie:'',
            monnaie_isAddnew:true
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
        return(
            <View>
                    <View style={styles.contenu}>
                        <View style={styles.infoContainer}>
                        <TextInput 
                            style={styles.textinput} returnKeyType="next" onChangeText={(text) => this.setState({type_monnaie:text})} 
                             value={this.state.type_monnaie} autoCorrect={false} placeholder='Monnaie'/>
                        </View> 
                    </View>
                    
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.buttonCont} onPress={() => {
                            if(this.state.type_monnaie.trim()==""){
                                alert("Fill the textinput");
                                return;
                            }
                            if(this.state.monnaie_isAddnew==true){
                                const newMon = {
                                    ref_monnaie:Math.floor(Date.now()/1000),
                                    type_monnaie:this.state.type_monnaie
                                }
                                insertMonnaie(newMon).then().catch((error)=>{
                                    alert (`Insert new monnaie error ${error}`);
                                });
                            }
                            //queryAllCasier();
                        }}>
                            <Text style={styles.txt}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCont} onPress={()=> 
                            this.close()
                            //queryAllMon()
                        }>
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
        // marginHorizontal:50
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