'use client';
import { Unit } from '@/types/user';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import {
  AddIcon,
  CircleCheck,
  CircleXMark,
  DeleteIcon,
  EditIcon
} from '@/shared/icons';
import { useModalContext } from 'providers/ModalProvider';
import { useEffect } from 'react';
import { TITLE_ADD_UNIT, TITLE_REMOVE_UNIT } from '@/constants/modal';
import { EFormTypes } from '../Form/types';
import { useSharedDataContext } from 'providers/SharedDataProvider';

export default function UnitsTable({ units }: { units: Unit[] }) {
  const {
    isOpen,
    toggle: toggleModal,
    setTitle: setTileModal,
    setFormType: setFormTypeModal
  } = useModalContext();
  const { setUnitsByUserId, unitsByUserId = [] } = useSharedDataContext();

  useEffect(() => {
    setUnitsByUserId(units);
  }, [units]);

  const tableHeaders = ['Consorcio', 'Nombre', 'Unidad', 'Acciones'];

  const handleAddUnit = () => {
    console.log('add');

    setTileModal(TITLE_ADD_UNIT);
    setFormTypeModal(EFormTypes.ADD_UNIT);
    toggleModal();
  };

  const editHandler: () => void = () => {
    console.log('edit');
  };

  useEffect(() => {
    console.log('isOpen', isOpen);
  }, [isOpen]);

  const deleteHandler: (userId: string) => void = async (userId) => {
    console.log('delete');

    setTileModal(TITLE_REMOVE_UNIT);
    toggleModal();

    // const user = await userService.deleteUser(userId);
    // console.log('user response', user);
  };

  return (
    <>
      <AddIcon
        onClickHandler={handleAddUnit}
        width={2.3}
        height={2.3}
        viewBox="0 0 24 24"
      />
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {unitsByUserId.map((unit) => (
            <TableRow key={unit._id}>
              <TableCell>{unit.partnership_id}</TableCell>
              <TableCell>
                <Text>{unit.name_expense}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  UF:{unit.unit} - Piso:{unit.floor} // Depto:{unit.department}
                </Text>
              </TableCell>
              <TableCell>
                <div className="flex flex-row">
                  <EditIcon onClickHandler={editHandler} />
                  <DeleteIcon onClickHandler={() => deleteHandler(unit._id)} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
