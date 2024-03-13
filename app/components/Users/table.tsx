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
import {
  CircleCheck,
  CircleXMark,
  DeleteIcon,
  EditIcon
} from '../shared/icons';
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

  const editHandler: (userId: string) => void = (userId) => {
    router.push(`/user/${userId}`);
  };

  const deleteHandler: (userId: string) => void = async (userId) => {
    const user = await userService.deleteUser(userId);
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
              {user?.verified ? <CircleCheck /> : <CircleXMark />}
            </TableCell>
            <TableCell>
              <div className="flex flex-row">
                <EditIcon onClickHandler={() => editHandler(user._id)} />
                <DeleteIcon onClickHandler={() => deleteHandler(user._id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
