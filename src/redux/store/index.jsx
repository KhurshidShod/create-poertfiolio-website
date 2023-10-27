import { configureStore } from "@reduxjs/toolkit";
import experiencesQuery, {
  experiencesName,
  experiencesReducer,
} from "../queries/experiences";
import { Provider } from "react-redux";
import usersQuery, { usersName, usersReducer } from "../queries/users";

const reducer = {
  [experiencesName]: experiencesReducer,
  [usersName]: usersReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([experiencesQuery.middleware, usersQuery.middleware])
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
