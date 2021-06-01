import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import {insertNewUser, allUser} from '../databases/allSchemas';
import FontAwesome5 from 'react-native-vector-icons/dist/FontAwesome5';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

class CreateUser extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id_user:0,
      name_user:'',
      email_user:'',
      pwd_user:'',
      pass_user:'',
      user_isAddNew:true
    };
  }
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color:'white',fontSize:25,alignItems:'center',justifyContent:'center',
        marginHorizontal:120,marginTop:30}}>Create account</Text>
      </View>
      <View style={styles.content}>
          <View style={styles.infoContainer}>
              <FontAwesome5 name="id-card" size={25} style={{marginLeft:-100}}/>
              <TextInput placeholder="Name" returnKeyType="next" autoCorrect={false} style={{marginLeft:50}}
                  onChangeText={(text) => this.setState({name_user:text})} value={this.state.name_user}></TextInput>
          </View>
          <View style={styles.infoContainer}>
              <Ionicons name="ios-mail" size={30} style={{marginLeft:-100}}/>
              <TextInput placeholder="Email" keyboardType="email-address" style={{marginLeft:50}}
                  returnKeyType="next" autoCorrect={false} onChangeText={(text) => this.setState({email_user:text})} value={this.state.email_user}></TextInput>
          </View>
          <View style={styles.infoContainer}>
              <Ionicons name="md-key" size={30} style={{marginLeft:-70}}/>
              <TextInput style={styles.textinput} placeholder="Password" style={{marginLeft:40}}
                  returnKeyType="next" secureTextEntry autoCorrect={false}
                  onChangeText={(text) => this.setState({pass_user:text})} value={this.state.pass_user}></TextInput>
          </View>
          <View style={styles.infoContainer}>
              <Ionicons name="md-key" size={30} style={{marginLeft:-10}}/>
              <TextInput style={styles.textinput} placeholder="Confirm password" returnKeyType="go" style={{marginLeft:40}}
                  secureTextEntry autoCorrect={false} onChangeText={(text) => this.setState({pwd_user:text})} value={this.state.pwd_user}></TextInput>
          </View>
          <View style={{marginTop:20}}>
              <TouchableOpacity style={styles.buttonCont} onPress={()=>{
                if(this.state.name_user.trim()== "" && this.state.email_user.trim()==""&& this.state.pwd_user.trim()=="" && this.state.pass_user.trim()==""){
                  alert("Fill the textinput");
                  return;
                }
                if(this.state.user_isAddNew==true){
                const newUser = {
                id_user: Math.floor(Date.now()/1000),
                name_user:this.state.name_user,
                email_user:this.state.email_user,
                pass_user:this.state.pass_user,
                pwd_user:this.state.pwd_user
              };
              insertNewUser(newUser).then(()=>{
                alert("Create user successfully")
              }).catch((error) => {
                alert (`Insert new user error ${error}`);
              });
             this.props.navigation.navigate("AuthScene")
            }
          }}>
              <Text style={{...styles.btn, color:'white'}}>Register</Text>
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
  //flex:1,
  backgroundColor:"#0E638B",
  height:100
},
content:{
  flex:1,
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
  marginTop:20,
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
export default CreateUser;