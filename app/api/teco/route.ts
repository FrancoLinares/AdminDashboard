import { APIRequestError } from '@/server/errors';
import tecoService from '@/server/services/tecoServices';
import { UnitFromTECO } from '@/types/user';
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
