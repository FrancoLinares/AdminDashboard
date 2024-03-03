import { Button } from '@tremor/react';
import { useModalContext } from 'providers/ModalProvider';
import { useSharedDataContext } from 'providers/SharedDataProvider';
import React from 'react';
import { toast } from 'sonner';
import { REMOVE_UNIT_ERROR, REMOVE_UNIT_SUCCESS } from './constants';

type Props = {};

const RemoveUnit = (props: Props) => {
  const { toggle, removeUnitId } = useModalContext();
  const { setUnitsByUserId } = useSharedDataContext();
  console.log('🚀 ~ RemoveUnit ~ removeUnitId:', removeUnitId);

  const removeUnit = (id: string) => {
    console.log('remove', id);
    fetch('/api/unit?type=removeUnit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ids: [id]
      })
    })
      .then((resp) => resp.json())
      .then((user) => {
        toast.success(REMOVE_UNIT_SUCCESS);

        setUnitsByUserId((prevState) =>
          prevState.filter((unit) => unit._id !== id)
        );
      })
      .catch((err) => {
        toast.error(REMOVE_UNIT_ERROR);
      })
      .finally(() => {
        toggle();
      });
  };

  return (
    <div className="xl:container xl:mx-auto flex justify-between">
      <div>
        <Button
          className="flex-auto w-32 ml-5 mt-10"
          variant="primary"
          onClick={() => removeUnit(removeUnitId as string)}
        >
          Eliminar
        </Button>
      </div>
      <div>
        <Button
          className="flex-auto w-32 mr-5 mt-10"
          variant="secondary"
          color="red"
          onClick={() => toggle()}
        >
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default RemoveUnit;
