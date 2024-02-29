import UnitsTable from './table';
import unitsService from '@/server/services/unitService';

const UnitsTableWrapper = async ({ userId }: { userId: string }) => {
  console.log('🚀 ~ UnitsTableWrapper ~ userId:', userId);
  // Get Units from the database
  const units = await unitsService.getUnitsByUserId(userId);
  console.log('🚀 ~ UnitsTableWrapper ~ Units:', units);

  return <UnitsTable units={units} />;
};

export default UnitsTableWrapper;
