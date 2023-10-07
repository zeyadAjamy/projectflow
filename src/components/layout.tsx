import { createBrowserRouter, RouterProvider, BrowserRouter } from "react-router-dom";
import { Tasks } from "./tasks";
import { ErrorPage } from "./404";
import { Header } from "./header";
import { Projects } from "./projects";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import storeConfig from "../store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Projects />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tasks",
    element: <Tasks />,
    errorElement: <ErrorPage />,
  },
]);

export const Layout = () => {
  return (
    <Provider store={storeConfig.store}>
      <PersistGate loading={null} persistor={storeConfig.persistor}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};
