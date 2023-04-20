import React, { useContext } from "react";
import {View, ActivityIndicator} from 'react-native'
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import {AuthContext} from './../constexts/AuthContext'

function Routes(){
    const {isAuthenticated, loading} = useContext(AuthContext);
      

    if(loading){
        return(
            <View 
            style={{
                flex:1,
                backgroundColor:'#1D1D2E',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <ActivityIndicator size={60} color="#f5f7fb"/>
            </View>
        )
    }

    //is autenticated faz a verificação
    //se false renderiza o appRoutes/ se true renderiza o componente AuthRoutes
    return(
        isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
    )
}

export default Routes;