'use client';
import React from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useModalContext } from 'providers/ModalProvider';

function Modal() {
  const modalContext = useModalContext();
  console.log('🚀 ~ Modal ~ modalContext:', modalContext);
  const { isOpen, setOpen } = modalContext;
  const searchParams = useSearchParams();
  const modal = searchParams.get('modal');

  return (
    <>
      {isOpen && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-white m-auto p-8">
            <div className="flex flex-col items-center">
              <p>Modal content</p>
              <br />
              <button
                type="button"
                className="bg-red-500 text-white p-2"
                onClick={() => setOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
