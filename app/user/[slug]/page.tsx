import UnitsTableWrapper from '@/components/Units/page';
import userService from '@/server/services/userService';
import { User } from '@/types/user';
import { Card, Text, Title } from '@tremor/react';
import React from 'react';

const User = async ({ params }: { params: { slug: string } }) => {
  console.log('params', params.slug);
  const users = await userService.getAll();
  const userSelected = users.find((user: User) => user._id === params.slug);
  console.log('🚀 ~ User ~ userSelected:', userSelected);
  console.log('🚀 ~ User ~ users:', users);
  // TODO: filter the user I want to show

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Usuario: {userSelected?.name}</Title>
      <Text>Email: {userSelected.email}</Text>
      <Text>Telefono: {userSelected.phone}</Text>
      <Card className="mt-6">
        <UnitsTableWrapper userId={params.slug} />
      </Card>
    </main>
  );
};

export default User;
