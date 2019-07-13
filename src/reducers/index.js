const initialState = {
  postcode: '',
  membershipFee: ''
};

export default (state, action) => {
  switch (action.type) {
    case 'SET_BOND_DETAILS':
      console.log(action.value);
      const newState = { ...state, ...action.value };
      return newState;
    default:
      return state;
  }
};
