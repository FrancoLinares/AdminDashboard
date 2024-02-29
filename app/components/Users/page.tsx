import UsersTable from '../shared/table';
import userService from '@/server/services/userService';
import { authWrapper } from '@/server/shared';

const UsersTableWrapper = async () => {
  // Get users from the database
  const users = await authWrapper(userService.getAll());
  console.log('🚀 ~ UsersTableWrapper ~ users:', users);

  return <UsersTable users={users} />;
};

export default UsersTableWrapper;
