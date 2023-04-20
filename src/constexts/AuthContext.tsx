import React, {useState, createContext, ReactNode, useEffect} from "react";
import {api} from '../services/api'
import {ToastAndroid} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


type AuthContextData = {
    user:UserProps;
    isAuthenticated: boolean;
    singIn:(credentials: SingInProps) => Promise<void>;
    loadingAuth : boolean;
    loading: boolean;
    signOut:()=> Promise<void>; 
}

type UserProps = {
    id:string,
    name:string,
    email:string,
    token:string 
}

type AuthProviderProps = {
    children:ReactNode
}

type SingInProps = {
    email:string,
    password:string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}:AuthProviderProps){
    //armazena um objeto na useState
    const [user, setUser]= useState<UserProps>({
        id:'',
        name:'',
        email:'',
        token:''
    })

    //acompanha o andamento dfa requisicao
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    //transforma o name em uma variável booleana
    const isAuthenticated = !!user.name;

    //useEffect vai ser executado quando a aplicação for aberta 
    useEffect(()=>{
        async function getUser(){
            //pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@sujeitopizzaria');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            //Verificar se recebemos as informações

            if(Object.keys(hasUser).length > 0){
                //Informar a API para usar o Token dele nas proximas requests
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token
                })
            }

            setLoading(false)
        }

        getUser();
    },[])

    //metodo de login
    async function singIn({email, password}:SingInProps){
        setLoadingAuth(true)

        try {
            const response = await api.post('/session', {
                email,
                password
            })
            
            //console.log(response.data)

            const {id, name, token} = response.data;

            const data = {
                ...response.data
            };
            //asyncsotrage só permite salvar uma string, por isso tera que converter o o bjeto
            await AsyncStorage.setItem('@sujeitopizzaria',JSON.stringify(data))

            //repassando para a api o token para que em um proximo login não seja necessário realizar o login novamente
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id, 
                name,
                email,
                token
            })

            setLoadingAuth(false)
        } catch (err) {
            ToastAndroid.show(`Erro ao acessar ${err}`, ToastAndroid.SHORT);
            console.log('erro ao acessar', err)
            setLoadingAuth(false)
        }
    }

    async function signOut(){
        await AsyncStorage.clear()
        //se der tudo certo
        .then(()=>{
            setUser({
                id:'',
                name:'',
                email:'',
                token:''
            })
        })
    }
    
    return(
            <AuthContext.Provider 
            value={{
            user, 
            isAuthenticated, 
            singIn,
            loadingAuth,
            loading,
            signOut}}>
                {children}
            </AuthContext.Provider>
    )
}