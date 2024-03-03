'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';
import { EFormTypes } from '@/components/Form/types';

export type Modal = {
  isOpen: boolean;
  toggle: () => void;
  title: string | null;
  setTitle: Dispatch<SetStateAction<string | null>>;
  formType: EFormTypes;
  setFormType: Dispatch<SetStateAction<EFormTypes | null>>;
  removeUnitId: string | null;
  setRemoveUnitId: Dispatch<SetStateAction<string | null>>;
};

export const ModalContext = createContext<Modal | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('Modal Context must be initialized');
  }

  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string | null>();
  const [formType, setFormType] = useState<EFormTypes | null>(null);
  const [removeUnitId, setRemoveUnitId] = useState<string | null>(null);
  const toggle = () => setOpen(!isOpen);

  const context = {
    isOpen,
    toggle,
    title,
    setTitle,
    formType,
    setFormType,
    removeUnitId,
    setRemoveUnitId
  } as Modal;

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};
