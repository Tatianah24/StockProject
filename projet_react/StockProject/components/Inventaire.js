import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity,StyleSheet,StatusBar,SafeAreaView} from 'react-native'
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import { Table, Row, Rows } from 'react-native-table-component';
import realm, { ARTICLE_SCHEMA, queryAllArticle } from '../databases/allSchemas';


class Inventaire extends Component{
    constructor(props){
        super(props);
        this.state = {
            tableHead:['Date','Référence','Désignation','Quantité','Valeur'],
            tableData:[]
        }
        this.reloadData();
    }
    reloadData = () => {
        queryAllArticle().then((tableData) => {
            this.setState({tableData});
        }).catch((error) => {
            this.setState({tableData : []});
        });
        console.log(`reloadData`);
    }
    render(){
        //const state = this.state
        // var params = this.props.navigation.state.params.id_art
        // var inventaire= realm.objects(ARTICLE_SCHEMA).filtered("id_art==$0",params)[0];
        // this.setState({tableData:inventaire});
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <StatusBar barStyle="dark-content"/>
                        <SafeAreaView style={styles.header}> 
                            <TouchableOpacity style={{alignItems:'flex-start',margin:16}} >
                                <AntDesign name="menu-fold" size={40} color="white" style={{marginLeft:20}} onPress={()=>{    
                                }}/>   
                            </TouchableOpacity>
                            <Text style={{color:"white",marginLeft:80,fontSize:20}}>Inventaires</Text>
                        </SafeAreaView>
                </View>
                <View style={styles.content}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {/* {
                        this.state.tableData.map((v,i)=>{
                            var design = v.design_art
                            return(
                                <Row data={design} textStyle={styles.text}/>
                            )
                        })
                    } */}
                    
                </Table>
                <View>
                    <Text style={{fontWeight:'bold',fontSize:18}}>TOTAL:</Text>
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
    header:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#0E638B',
        height:100,
        margin:0,
        width:'100%'
    },
    content:{ 
        flex: 1, 
        padding: 16, 
        width:'100%',
        paddingTop: 30, 
        backgroundColor: '#fff' },
    head: {
        height: 60, 
        backgroundColor: '#f1f8ff' },
    text: {
         margin: 6 
        }
})
export default Inventaire;