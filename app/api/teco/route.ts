import { APIRequestError } from '@/server/errors';
import tecoService from '@/server/services/tecoServices';
import unitsService from '@/server/services/unitService';
import { UnitFromTECO } from '@/types/user';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const getPartnerships = async () => {
  try {
    const partnerships = await tecoService.getPartnerships();
    return NextResponse.json(partnerships);
  } catch (err) {
    return NextResponse.json({ error: 'Fallo al obtener las consorcios' });
  }
};

const getUnitsByPartnershipId = async (id: string) => {
  try {
    const units = (await tecoService.getUnitsByPartnershipId(
      id
    )) as UnitFromTECO[];
    return NextResponse.json(units.sort((a, b) => a.unit - b.unit));
  } catch (err) {
    return NextResponse.json({ error: 'Fallo al obtener las unidades' });
  }
};

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

export async function GET(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    const id = req.nextUrl.searchParams.get('id') as string;

    switch (type) {
      case 'partnerships':
        return await getPartnerships();
      case 'units':
        return await getUnitsByPartnershipId(id);
      default:
        return NextResponse.json({});
    }
  } catch (err: any | APIRequestError) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode | 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const type = req.nextUrl.searchParams.get('type');
    const body = (await req.json()) || null;

    switch (type) {
      case 'addUnit':
        return await addUnit(
          body as unknown as { unitId?: number; userId?: string } | null
        );
      default:
        return NextResponse.json({});
    }
  } catch (err: any | APIRequestError) {
    return new NextResponse(err.message, {
      status: err.statusCode | 500
    });
  }
}
