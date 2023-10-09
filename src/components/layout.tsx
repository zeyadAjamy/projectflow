import { Route, HashRouter, Routes } from "react-router-dom";
import { Tasks } from "./tasks";
import { ErrorPage } from "./404";
import { Projects } from "./projects";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeConfig from "../store/store";
import { HelmetProvider } from "react-helmet-async";

export const Layout = () => {
  return (
    <Provider store={storeConfig.store}>
      <HelmetProvider>
        <PersistGate loading={null} persistor={storeConfig.persistor}>
          <HashRouter>
            <Routes>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/" element={<Projects />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </HashRouter>
        </PersistGate>
      </HelmetProvider>
    </Provider>
  );
};
