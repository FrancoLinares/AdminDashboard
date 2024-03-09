import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import NewsContainer from './News/NewsContainer';
import EmailsContainer from './Emails/EmailsContainer';
import { getServerSession } from 'next-auth';
import { authOptions } from 'api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Notifications() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/auth/signin');
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <TabGroup>
        <TabList variant="line" defaultValue="1">
          <Tab value="1">E-mails</Tab>
          <Tab value="2">Noticias (App Mobile)</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmailsContainer />
          </TabPanel>
          <TabPanel>
            <NewsContainer />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </main>
  );
}
