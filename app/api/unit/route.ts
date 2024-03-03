import { APIRequestError } from '@/server/errors';
import unitsService from '@/server/services/unitService';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// POST handlers
const addUnit = async (body: { unitId?: number; userId?: string } | null) => {
  if (!body?.unitId && !body?.userId)
    return NextResponse.json({ error: 'Faltan datos' });

  const unit = await unitsService.addUnit({
    userId: body.userId as string,
    unitId: Number(body.unitId) as number
  });
  revalidateTag('units');
  return NextResponse.json(unit);
};

const removeUnit = async (body: { ids: string[] } | null) => {
  if (!body?.ids) return NextResponse.json({ error: 'Faltan datos' });

  const unit = await unitsService.removeUnit({
    ids: body.ids
  });
  revalidateTag('units');
  return NextResponse.json(unit);
};

export async function POST(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    const body = (await req.json()) || null;

    switch (type) {
      case 'addUnit':
        return await addUnit(
          body as unknown as { unitId?: number; userId?: string } | null
        );
      case 'removeUnit':
        return await removeUnit(body as unknown as { ids: string[] } | null);
      default:
        return NextResponse.json({});
    }
  } catch (err: any | APIRequestError) {
    return new NextResponse(err.message, {
      status: err.statusCode | 500
    });
  }
}
