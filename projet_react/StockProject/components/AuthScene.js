import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import  realm, { USER_SCHEMA } from '../databases/allSchemas';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import Realm from 'realm';
// let realm;

class AuthScene extends Component{
  constructor(props){
    super(props);
    // realm = new Realm({ path: 'stockManager.realm' });
    this.state = {
      input_user_email:'',
      input_user_pwd:''
    };
  }
  render(){
    return(
      <View style={styles.container}>
       <View style={styles.header}>
          <Text style={{color:'white',fontSize:25,alignItems:'center',justifyContent:'center',
          marginHorizontal:150,marginTop:30}}>Sign in</Text>
      </View>
        <View style={styles.content}>
            <View style={styles.infoContainer}>
                <Ionicons name="ios-mail" size={25} style={{marginLeft:-100,position:'relative'}}/>
                <TextInput  placeholder="Email" onChangeText={(text) => this.setState({input_user_email:text})} 
                  value={this.state.input_user_email} keyboardType="email-address" returnKeyType="next"
                  autoCorrect={false} style={{marginLeft:50,position:'relative'}}></TextInput>
            </View>
           <View style={styles.infoContainer}>
                <Ionicons name="md-key" size={25} style={{marginLeft:-60,position:'relative'}}/>
                <TextInput 
                   placeholder="Password" onChangeText={(text) => this.setState({input_user_pwd:text})} 
                  value={this.state.input_user_pwd} returnKeyType="go" secureTextEntry
                  autoCorrect={false} style={{marginLeft:50,position:'relative'}}></TextInput>
           </View>
           <View>
           <TouchableOpacity style={styles.buttonCont} onPress={()=>{
              // try{
              //   var user_auth = realm.objects(USER_SCHEMA).filtered('email_user==$0',this.state.input_user_email)[0];
              //   var MyJSON = JSON.stringify(user_auth);
              //   console.log(MyJSON);
              //   console.log(user_auth.pwd_user)
              //   console.log(this.state.input_user_pwd)
              //   if(this.state.input_user_email.trim()==""){
              //     alert("Fill the textinput");
              //     return;
              //   }
              //   if(this.state.input_user_pwd.trim()==""){
              //     alert("Fill the textinput");
              //     return;
              //   }
              //   if (user_auth.pwd_user == this.state.input_user_pwd){
              //       this.props.navigation.navigate("Home")
              //       }
              //   else{
              //     alert("Password incorrect");
              //   }
              // }
              // catch(e){
              //   console.log(e)
              // }
              
              this.props.navigation.navigate("Home")
           }}>
              <Text style={{...styles.btn, color:'white'}}>Log in</Text>
            </TouchableOpacity>
           </View> 
        </View>
      </View>
    );
      
    }
  }

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  header:{
    backgroundColor:"#0E638B",
    height:100
  },
  content:{
    flex:2,
    backgroundColor:"white",
    marginTop:50,
    
  },
  infoContainer:{
    height:60,
    marginLeft:30,
    borderRadius:30,
    backgroundColor:'#F1F1F1',
    width:350,
    marginTop:20,
    fontSize:18,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonCont:{
    backgroundColor:'#03999C',
    paddingVertical:15,
    width:200,
    marginTop:40,
    borderRadius:30,
    borderBottomWidth:2,
    borderTopWidth:2,
    borderLeftWidth:2,
    borderRightWidth:2,
    borderColor:'white',
    marginHorizontal:100
  },
  btn:{
    textAlign:'center',
    fontSize:18
  }
});

export default AuthScene;