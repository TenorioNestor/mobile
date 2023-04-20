import React, {useContext} from "react";
import {Text, View, Button} from 'react-native'
import {AuthContext} from '../../constexts/AuthContext'

export default function Dashboard(){
    const {signOut} = useContext(AuthContext)

    return (
        <View>
            <Text> Tela dashboard</Text>
            <Button
            title="Sair do App"
            onPress={signOut}
            />
        </View>

    )
} 