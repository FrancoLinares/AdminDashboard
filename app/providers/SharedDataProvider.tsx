'use client';
import { Unit, User } from '@/types/user';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';

export type SharedData = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  unitsByUserId: Unit[];
  setUnitsByUserId: Dispatch<SetStateAction<Unit[]>>;
};

export const SharedDataContext = createContext<SharedData | undefined>(
  undefined
);

export const useSharedDataContext = () => {
  const context = useContext(SharedDataContext);

  if (context === undefined) {
    throw new Error('Modal Context must be initialized');
  }

  return context;
};

export const SharedDataProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [unitsByUserId, setUnitsByUserId] = useState<Unit[] | undefined>(
    undefined
  );

  const context = {
    user: useMemo(() => user, [user]),
    setUser,
    unitsByUserId: useMemo(() => unitsByUserId, [unitsByUserId]),
    setUnitsByUserId
  } as SharedData;

  return (
    <SharedDataContext.Provider value={context}>
      {children}
    </SharedDataContext.Provider>
  );
};
