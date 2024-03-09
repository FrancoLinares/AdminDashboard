// Opt out of caching for all data requests in the route segment
export const fetchCache = 'force-no-store';

import UnitsTableWrapper from '@/components/Units/page';
import UserInformation from '@/components/Users/UserInformation';
import userService from '@/server/services/userService';
import { User } from '@/types/user';
import { Card } from '@tremor/react';
import React from 'react';

const User = async ({ params }: { params: { slug: string } }) => {
  const users = await userService.getAll();
  const userSelected = users.find((user: User) => user._id === params.slug);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      {userSelected && <UserInformation user={userSelected} />}
      <Card className="mt-6">
        <UnitsTableWrapper userId={params.slug} />
      </Card>
    </main>
  );
};

export default User;
