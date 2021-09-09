export const setFilteredPets = (payload) => ({
  type: "SET_PETS",
  payload,
});

export const deletePet = (payload) => ({
  type: "DELETE_PET",
  payload,
});
