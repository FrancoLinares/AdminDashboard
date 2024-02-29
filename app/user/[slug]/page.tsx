import UnitsTableWrapper from '@/components/Units/page';
import { Card } from '@tremor/react';
import React from 'react';

const User = ({ params }: { params: { slug: string } }) => {
  console.log('params', params.slug);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <UnitsTableWrapper userId={params.slug} />
      </Card>
    </main>
  );
};

export default User;
