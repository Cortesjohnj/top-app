const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PETS":
      return {
        ...state,
        filteredPets: action.payload,
      };

    case "DELETE_PET":
      return {
        ...state,
        filteredPets: state.filteredPets.filter(
          (pet) => pet._id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default reducer;
