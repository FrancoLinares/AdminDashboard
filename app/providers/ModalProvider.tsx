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
  submitAddUnit: (data: any) => void;
  formType: EFormTypes;
  setFormType: Dispatch<SetStateAction<EFormTypes | null>>;
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
  const toggle = () => setOpen(!isOpen);
  const submitAddUnit = (data: any) => {
    console.log('submitAddUnit - data', data);
  };

  const context = {
    isOpen,
    toggle,
    submitAddUnit,
    title,
    setTitle,
    formType,
    setFormType
  } as Modal;

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};
