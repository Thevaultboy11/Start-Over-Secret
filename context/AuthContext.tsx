import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import '../firebase-config'; // safe to import, it just initializes

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") { // 🔥 only run on client
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          await firebaseUser.reload();
          if (firebaseUser.emailVerified) {
            setUser(firebaseUser);
          } else {
            await signOut(auth);
            setUser(null);
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const logout = async () => {
    const auth = getAuth(); // safe here because it's called inside event (browser only)
    await signOut(auth);
  };

  const value = { user, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
