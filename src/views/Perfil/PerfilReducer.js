const INITIAL_STATE = {
  email: "",
  name: "",
  lastname: "",
  address: "",
  city: "",
  country: "",
  about: "",
  atividades: []
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE":
      const user = action.payload.data[0];
      return {
        ...state,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        city: user.city,
        country: user.country,
        about: user.about
      };
    case "SAVE_USER_PROFILE":
      return { ...state };
    case "PASSWORD_CHANGED":
      return { ...state };
    case "GET_ACTIVITIES":
      return { ...state, atividades: action.payload };
    default:
      return state;
  }
};
