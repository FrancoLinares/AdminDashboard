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
import { toast } from 'sonner';
import { UNIT_NOT_FOUND } from './constants';

export default function UnitsTable({ units }: { units: Unit[] }) {
  const {
    isOpen,
    toggle: toggleModal,
    setTitle: setTileModal,
    setFormType: setFormTypeModal,
    setRemoveUnitId
  } = useModalContext();
  const { setUnitsByUserId, unitsByUserId = [] } = useSharedDataContext();

  useEffect(() => {
    setUnitsByUserId(units);
  }, [units]);

  const tableHeaders = ['Consorcio', 'Nombre', 'Unidad', 'Acciones'];

  const handleAddUnit = () => {
    setTileModal(TITLE_ADD_UNIT);
    setFormTypeModal(EFormTypes.ADD_UNIT);
    toggleModal();
  };

  useEffect(() => {
    console.log('isOpen', isOpen);
  }, [isOpen]);

  const deleteHandler: (userId: string) => void = async (userId) => {
    const unitToDelete = unitsByUserId.find((user) => user._id === userId);
    if (!unitToDelete) {
      return toast.error(UNIT_NOT_FOUND);
    }

    setTileModal(
      `${TITLE_REMOVE_UNIT} UF:${unitToDelete.unit} - Piso:${unitToDelete.floor} // Depto:${unitToDelete.department} ?`
    );
    setFormTypeModal(EFormTypes.REMOVE_UNIT);
    setRemoveUnitId(unitToDelete._id);
    toggleModal();
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
