'use client';
import { User } from '@/types/user';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { CircleCheck, CircleXMark, DeleteIcon, EditIcon } from './icons';
import userService from 'services/userService';
import { useRouter } from 'next/navigation';

export default function UsersTable({ users }: { users: User[] }) {
  const router = useRouter();

  const tableHeaders = [
    'Nombre',
    'Email',
    'Telefono',
    'Verificado',
    'Acciones'
  ];

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
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.phone}</Text>
            </TableCell>
            <TableCell>
              {user?.verified ? <CircleXMark /> : <CircleCheck />}
            </TableCell>
            <TableCell>
              <div className="flex flex-row">
                <EditIcon onClickHandler={editHandler} />
                <DeleteIcon onClickHandler={() => deleteHandler(user._id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
