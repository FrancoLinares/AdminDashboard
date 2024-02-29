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
import { CircleCheck, CircleXMark } from './icons';

export default function UsersTable({ users }: { users: User[] }) {
  const tableHeaders = ['Nombre', 'Email', 'Telefono', 'Verificado'];

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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
