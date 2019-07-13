import { SET_BOND_DETAILS } from '../constants';

export const setBondDetails = details => ({
  type: SET_BOND_DETAILS,
  value: details
});
