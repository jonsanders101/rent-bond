import { MEMBERSHIP_FEE_URL, POST_BOND_URL } from '../constants';

export const fetchFixedMembershipFee = cb => {
  fetch(MEMBERSHIP_FEE_URL).then(res => {
    if (res.ok) {
      return res.json().then(cb);
    } else {
      console.error('NETWORK ERROR WHILE FETCHING:', res.statusText);
    }
  });
};

export const postRentBond = cb => {
  fetch(POST_BOND_URL, {
    method: 'POST',
    body: {
      postcode: this.state.postcode,
      membershipFee: this.state.membershipFee
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(cb);
    } else {
      console.log('NETWORK ERROR WHILE FETCHING');
    }
  });
};
