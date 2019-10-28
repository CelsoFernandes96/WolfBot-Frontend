import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import DashboardReducer from "./views/Dashboard/DashboardReducer";
import AuthReducer from "./views/pages/AuthReducer";
import PerfilReducer from "./views/Perfil/PerfilReducer";

const rootReducer = combineReducers({
  dashboard: DashboardReducer,
  form: formReducer,
  auth: AuthReducer,
  profile: PerfilReducer,
});
export default rootReducer;
