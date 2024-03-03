'use client';

import { User } from '@/types/user';
import { Text, Title } from '@tremor/react';
import { useSharedDataContext } from 'providers/SharedDataProvider';
import React from 'react';

interface UserProps {
  user: User;
}

const UserInformation: React.FC<UserProps> = ({ user }) => {
  const { setUser } = useSharedDataContext();
  // every time user changes, setUser is called
  setUser(user);

  return (
    <div>
      <Title>Usuario: {user?.name}</Title>
      <Text>Email: {user.email}</Text>
      <Text>Telefono: {user.phone}</Text>
    </div>
  );
};

export default UserInformation;
