import React, { useContext, useState } from "react";
import { 
    View, 
    Text, 
    StyleSheet,
    Image,
    TextInput,
    Keyboard,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator
} from 'react-native' ;
///consumindo o contexto
import {AuthContext} from '../../constexts/AuthContext'

export default function SingIn(){

    //CONSUMINDO O CONTEXTO
    const {singIn, loadingAuth} = useContext(AuthContext)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        if(email==='' || password===''){
                ToastAndroid.show('Please, put your email and password!', ToastAndroid.SHORT);
        }
        //console.log(`Esse é o email:${email} e essa é a senha ${password}`)
        Keyboard.dismiss();
        await singIn({email, password})

        setEmail('')
        setPassword('')
    }

    type IProps = {
        theme?: 'light' | 'dark';
        colors?: [IColors, IColors] /** ['light_colors' , 'dark_colors'] */;
      };
      type IColors = {
        label: string;
        card: string;
        overlay: string;
        success: string;
        danger: string;
        warning: string;
      };

    return (
        <View style={styles.container}>
            <Image
             style={styles.logo}
             source={require('../../../assets/logo.png')}
            />

            <View style={styles.InputContainer}>
                <TextInput
                placeholder="Digite seu email"
                style={styles.input}
                keyboardType='email-address'
                placeholderTextColor='#f0f0f0'
                value={email}
                onChangeText={(text)=>setEmail(text)}
                />
                
                <TextInput
                placeholder="Digite sua senha"
                style={styles.input}
                secureTextEntry={true}
                placeholderTextColor='#f0f0f0'
                value={password}
                onChangeText={setPassword}
                
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin} >
                    { loadingAuth ? (
                        <ActivityIndicator size={25} color={'#fff'}/>
                    ):(<Text style={styles.buttonText}>Acessar</Text>)}
                    
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1d1d2e'


    },
    logo:{
        marginBottom:18
    },
    InputContainer:{    
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14
    },
    input:{
        width:'95%',
        height:40,
        backgroundColor:"#101026",
        color:"#FFF",
        borderRadius:8,
        paddingHorizontal:8,
        fontSize:16,
        marginBottom:10,
        
    },
    button:{
        width:'95%',
        height:40,
        backgroundColor:'#3fffa3',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#101026'

    }
})
