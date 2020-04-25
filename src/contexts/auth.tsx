import React, { createContext, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

import api from '../services/api';
import * as auth from '../services/auth';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn(): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadStorageData() {
      const [storageUser, storageToken] = await AsyncStorage.multiGet([
        '@AUTHRN:user',
        '@AUTHRN:token',
      ]);

      if (storageUser[1] && storageToken[1]) {
        // add token in header
        api.defaults.headers.Authorization = `Bearer ${storageToken[1]}`;

        setUser(JSON.parse(storageUser[1]));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function signIn() {
    const response = await auth.signIn();

    setUser(response.user);

    // add token in header
    api.defaults.headers.Authorization = `Bearer ${response.token}`;

    await AsyncStorage.multiSet([
      ['@AUTHRN:user', JSON.stringify(response.user)],
      ['@AUTHRN:token', response.token],
    ]);
  }

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loading, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
