'use client';
import React from 'react';
import { useModalContext } from 'providers/ModalProvider';
import { Button, Dialog, DialogPanel } from '@tremor/react';

import FormAddUnit from '../Form/AddUnit';

const Modal = () => {
  const { isOpen, toggle, title, formType } = useModalContext();

  const formComponents = {
    ADD_UNIT: (
      <FormAddUnit
        onCancel={(e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault();
          toggle();
        }}
      />
    )
  };

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => toggle()} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            {title}
          </h3>
          {formComponents[formType as keyof typeof formComponents]}
          <Button
            className="mt-8 w-full"
            variant="secondary"
            color="red"
            onClick={() => toggle()}
          >
            Cerrar
          </Button>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default Modal;
