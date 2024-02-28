import { getServerSession } from 'next-auth';
import { authOptions } from 'api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { Card, Title, Text } from '@tremor/react';
import Search from './components/shared/search';
import UsersTableWrapper from './components/Users/page';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const session = await getServerSession(authOptions);
  console.log('🚀 ~ session:', session);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      <Text>A list of users retrieved from a Postgres database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTableWrapper />
      </Card>
    </main>
  );
}
