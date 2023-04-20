import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SingIn from '../pages/SingIn'
//usuarios não logados podem acessar
 const Stack = createNativeStackNavigator();

 function AuthRoutes(){
    return(
        <Stack.Navigator>
        <Stack.Screen name="SingIn" component={SingIn} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
 }


 export default AuthRoutes;