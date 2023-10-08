import { createStore, combineReducers } from "redux";
import { projectsReducer } from "./reducers/projectsReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  projects: projectsReducer,
});

const persistConfig = {
  key: "my-todo-presistor",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default { store, persistor };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
