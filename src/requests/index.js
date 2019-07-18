import { MEMBERSHIP_FEE_URL } from '../constants';

export const fetchFixedMembershipFee = cb => {
  fetch(MEMBERSHIP_FEE_URL).then(res => {
    if (res.ok) {
      return res.json().then(cb);
    } else {
      console.error('NETWORK ERROR WHILE FETCHING:', res.statusText);
    }
  });
};
