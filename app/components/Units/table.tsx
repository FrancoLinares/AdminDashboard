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
  CircleCheck,
  CircleXMark,
  DeleteIcon,
  EditIcon
} from '../shared/icons';
import userService from 'services/userService';
import { useRouter } from 'next/navigation';

export default function UnitsTable({ units }: { units: Unit[] }) {
  const router = useRouter();

  const tableHeaders = ['Consorcio', 'Nombre', 'Unidad', 'Acciones'];

  const editHandler: () => void = () => {
    console.log('edit');

    router.push('/user');
  };

  const deleteHandler: (userId: string) => void = async (userId) => {
    console.log('delete');

    const user = await userService.deleteUser(userId);
    console.log('user response', user);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {units.map((unit) => (
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
  );
}
