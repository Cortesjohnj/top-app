const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PETS":
      return {
        ...state,
        filteredPets: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
