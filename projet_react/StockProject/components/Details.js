import React , {Component} from 'react';
import {Text, View, StyleSheet, TextInput, StatusBar, SafeAreaView, TouchableOpacity,TouchableWithoutFeedback, Image} from 'react-native';
import realm, {FRS_SCHEMA, ARTICLE_SCHEMA,queryAllFournir} from '../databases/allSchemas';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import BottomNavigator from './BottomNavigator';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import {ModalFournir} from './ModalFournir';


class Details extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_frs:'',
        }
    }
    
    render(){
        let params = this.props.navigation.state.params.id_frs
        console.log(params)
        var frs_detail =  realm.objects(FRS_SCHEMA).filtered('id_frs==$0',params)[0];
        console.log(frs_detail)
        var nom_frs=frs_detail.nom_frs
        var prenom_frs=frs_detail.prenom_frs
        var tel_frs = frs_detail.tel_frs
        var adresse_frs = frs_detail.adresse_frs
        var frs=""
        const {state,id_frs} = this.state;

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
                            <TouchableOpacity onPress={()=>queryAllFournir()}>
                            <AntDesign name="menu-fold" size={40} color="white" style={{marginLeft:10}}/>
                            </TouchableOpacity>
                            
                            <Text style={{color:"white",marginLeft:120,fontSize:20}}>Détails</Text>                          
                            <TouchableWithoutFeedback onPress={onShowPopup}>
                                <Image style={styles.addButtonImage} source={require('../images/add.png')}/>
                            </TouchableWithoutFeedback>   
                            <ModalFournir
                                title='Fournir un article'
                                ref={(target) => popupRef = target}
                                onTouchOutside={onClosePopup}
                            />
                        </SafeAreaView>
                </View>
                <View style={{flex:1}}>
                <View style={{
                    marginTop:10,
                    padding:16,
                    elevation:15,
                    backgroundColor:'white',
                    height:150
                }}>
                    <View style={{marginTop:10}}>
                        <Text style={styles.txt}>Nom:  {nom_frs}</Text>
                        <Text style={styles.txt}>Prénoms:  {prenom_frs}</Text>
                        <Text style={styles.txt}>Téléphone:  {tel_frs}</Text>
                        <Text style={styles.txt}>Adresse:  {adresse_frs}</Text>
                    </View>
                </View>
                <View style={{marginTop:10,
                width:'100%',marginLeft:70,borderBottomColor:'black',borderBottomWidth:3}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>Listes des articles fournis</Text>
                </View>
                </View>
               
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    header:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#0E638B',
        height:100,
        marginTop:0,
        width:'100%'
    },
    addButtonImage:{
        width:42,
        height:42,
        tintColor:'white',
        marginLeft:100
    },
    txt:{
        alignItems:'center',
        justifyContent:'center',
        fontSize:18,
        marginRight:150
    },
    tableau:{
         flex: 1, 
         padding: 16, 
         paddingTop: 10, 
         backgroundColor: '#fff',
         width:'100%',
         position:'absolute',
        //  alignItems:'center',
        //  justifyContent:'center'
        //  marginBottom:300
    },
    head: {
         height: 40, 
         backgroundColor: '#f1f8ff',
        },
  text: { 
      margin: 6,
      fontSize:15
     },
     
})
export default Details;