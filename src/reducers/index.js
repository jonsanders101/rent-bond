const initialState = {
  postcode: '',
  membershipFee: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOND_DETAILS':
      return { ...state, ...action.value };
    default:
      return state;
  }
};
