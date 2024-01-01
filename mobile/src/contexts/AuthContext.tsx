import React, {useState, createContext, ReactNode, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../services/api'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    loadingAuth: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
  }

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
      id: '',
      name: '',
      email: '',
      token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user.name // Converte para um booleano
    useEffect(() => {
        async function getUser(){
            // Pegar os dados salvos do user
            const userInfo = await AsyncStorage.getItem('@gms');
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            // Verificar se recebemos as informações do user
            if (Object.keys(hasUser).length > 0){
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`;
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

    }, []);

    async function signIn({email, password}: SignInProps){

        setLoadingAuth(true);

        try {
            // Tentando fazer uma requisição
            const response = await api.post("/session", {
                email,
                password
            })

            // console.log(response.data);
            const {id, name, token} = response.data;

            // Salvando no localStorage
            const data = { ...response.data };

            await AsyncStorage.setItem('@gms', JSON.stringify(data));

            api.defaults.headers.common['Authorization'] = `Bearer ${token}` // Passando o token para as proximas requisicoes
            setUser({
                id,
                name,
                email,
                token
            });
            setLoadingAuth(false);

        } catch (error) {
            // Caso ocorra algum tipo de erro
            // toast.success(`${error}`);
            console.log(`Algo deu errado com a requisicao ${error}`);
            setLoadingAuth(false);
        }
    }

    // Funtion que faz com que saiamos da aplicação
    async function signOut(){
        await AsyncStorage.clear()
        .then( () => {
          setUser({
            id: '',
            name: '',
            email: '',
            token: ''
          })
        })
      }

    return(
        <AuthContext.Provider value={
            {
                user,
                isAuthenticated,
                signIn,
                loading,
                loadingAuth,
                signOut
            }
        }>

            {children}
        </AuthContext.Provider>
    )
}
