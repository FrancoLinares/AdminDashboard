import { APIRequestError } from '@/server/errors';
import emailService from '@/server/services/emailService';
import { NextRequest, NextResponse } from 'next/server';

type CreateEmailProps = {
  partnership_ids: string[];
  admin_name: string;
  msg_content: string;
};

const createEmail = async (createEmailProps: CreateEmailProps) => {
  console.log('createEmailProps', createEmailProps);
  const email = await emailService.addEmail(createEmailProps);
  return NextResponse.json(email);
};

export async function POST(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    const body: CreateEmailProps = (await req.json()) || null;

    switch (type) {
      case 'create':
        const { partnership_ids, admin_name, msg_content } = body ?? {};
        if (!partnership_ids || !admin_name || !msg_content) {
          return NextResponse.json({
            error: 'Faltan datos'
          });
        }
        const createEmailProps = {
          partnership_ids,
          admin_name,
          msg_content
        };

        return await createEmail(createEmailProps);
      default:
        return NextResponse.json({});
    }
  } catch (err: any | APIRequestError) {
    return NextResponse.json({
      error: `this is an error from chatcher ${err.message}`,
      status: 304
    });
  }
}
