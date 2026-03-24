import { createContext, useContext, useState, FC, ReactNode } from 'react';

interface GravityContextType {
  gravityEnabled: boolean;
  toggleGravity: () => void;
}

const GravityContext = createContext<GravityContextType | undefined>(undefined);

export const GravityProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [gravityEnabled, setGravityEnabled] = useState(true);

  const toggleGravity = () => {
    setGravityEnabled(prev => !prev);
  };

  return (
    <GravityContext.Provider value={{ gravityEnabled, toggleGravity }}>
      {children}
    </GravityContext.Provider>
  );
};

export const useGravity = () => {
  const context = useContext(GravityContext);
  if (context === undefined) {
    throw new Error('useGravity must be used within a GravityProvider');
  }
  return context;
};
