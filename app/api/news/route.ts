import { APIRequestError } from '@/server/errors';
import newsService from '@/server/services/newsServices';
import { NextRequest, NextResponse } from 'next/server';

type CreateNewsProps = {
  partnershipId: string;
  title: string;
  content: string;
};

const createNews = async (createNewsProps: CreateNewsProps) => {
  const news = await newsService.addNews(createNewsProps);
  return NextResponse.json(news);
};

export async function POST(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    const body = (await req.json()) || null;

    switch (type) {
      case 'create':
        const { partnershipId, title, content } = body ?? {};
        if (!partnershipId || !title || !content) {
          return NextResponse.json({
            error: 'Faltan datos'
          });
        }
        const createNewsProps = {
          partnershipId,
          title,
          content
        };

        return await createNews(createNewsProps);
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
