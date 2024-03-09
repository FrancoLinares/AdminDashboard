import { Partnership } from '@/types/shared';

export const isValidPartnership = (
  partnershipList: Partnership[],
  partnershipId: string
) =>
  Boolean(
    partnershipList.find(
      (partnership) => `${partnership.id}` === `${partnershipId}`
    )
  );
