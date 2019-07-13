export default (state, action) => {
  switch (action.type) {
    case 'SET_BOND_DETAILS':
      return { ...state, ...action.value };
    default:
      return state;
  }
};
