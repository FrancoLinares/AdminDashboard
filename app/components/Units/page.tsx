import UnitsTable from './table';
import unitsService from '@/server/services/unitService';

const UnitsTableWrapper = async ({ userId }: { userId: string }) => {
  // Get Units from the database
  const units = await unitsService.getUnitsByUserId(userId);
  console.log('🚀 ~ UnitsTableWrapper ~ units:', units);

  return <UnitsTable units={units} />;
};

export default UnitsTableWrapper;
