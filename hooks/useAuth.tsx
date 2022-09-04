import * as React from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { useRouter } from 'next/router';

import { auth } from '../firebase';

interface FormInput {
  email: string;
  password: string;
}

interface Auth {
  user: User | null;
  signUp: (formInput: FormInput) => Promise<void>;
  signIn: (formInput: FormInput) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = React.createContext<Auth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  const [initialLoading, setInitialLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(true);
          router.push('/login');
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async ({ email, password }: FormInput) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(user);
      router.push('/');
    } catch (_error: any) {
      alert(_error.message);
      setError(_error.message);
    }

    setLoading(false);
  };

  const signIn = async ({ email, password }: FormInput) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      setUser(user);
      router.push('/');
    } catch (_error: any) {
      alert(_error.message);
      setError(_error.message);
    }

    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (_error: any) {
      alert(_error.message);
      setError(_error.meesage);
    }

    setLoading(false);
  };

  const memoedValue = React.useMemo(() => {
    return { user, signUp, signIn, logout, error, loading };
  }, [user, loading, error]);

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
