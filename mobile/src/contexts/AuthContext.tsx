import React, {useState, createContext, ReactNode} from 'react';

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
};

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({
        id: 'a1b1c1d1',
        name: 'Programmer',
        email: 'programer@hotmail.com',
        token: 'programmer123@',
    });

    const isAuthenticated = !!user.name // Converte para um booleano

    return(
        <AuthContext.Provider value={{user, isAuthenticated}}>

            {children}
        </AuthContext.Provider>
    )
}
