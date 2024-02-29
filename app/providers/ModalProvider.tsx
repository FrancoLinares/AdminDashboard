'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

type Modal = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<Modal | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('Context must be initialized');
  }

  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  const context = { isOpen, setOpen };

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};
