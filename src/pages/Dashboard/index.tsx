import React, {useContext, useState} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {AuthContext} from '../../constexts/AuthContext'
import { Color } from "react-native-alert-notification/lib/typescript/service";
import { useNavigation} from '@react-navigation/native'
import {StackPramsList} from '../../routes/app.routes'
import { NativeStackNavigationProp} from '@react-navigation/native-stack'

export default function Dashboard(){
    const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
    //const {signOut} = useContext(AuthContext)
    const [number, setNumber]= useState('')

    async function openOrder(){
        if(number ===''){
            return alert('Favor, preencha o numero da mesa!')
        } 
        
        navigation.navigate('Order', {number:number, order_id:'123'})
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>
            <TextInput
                style={styles.input}
                placeholder="Numero da Mesa"
                placeholderTextColor="#f0f0f0"
                keyboardType="numeric"
                value={number}
                onChangeText={setNumber}

            />
            <TouchableOpacity style={styles.button} onPress={openOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>

            </TouchableOpacity>

        </SafeAreaView>

    )
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor:'#1d1d2e'
    },
    title:{
        fontSize:15,
        fontWeight: 'bold',
        color:'#fff',
        marginBottom: 24
    },
    input:{
        width:'90%',
        height:60,
        backgroundColor:'#101026',
        borderRadius:8,
        paddingHorizontal:8,
        textAlign:'center',
        fontSize:22,
        color:'#fff'
    },
    button:{
        width:'90%',
        height:40,
        backgroundColor:'#3fffa3',
        borderRadius:8,
        marginVertical:12,
        justifyContent:'center',
        alignItems: 'center'
    },
    buttonText:{
        fontSize:18,
        color:'#101026',
        fontWeight:'bold'

    }
})