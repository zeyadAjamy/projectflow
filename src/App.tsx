import React from "react";
import store from "./store/store";
import { Provider } from "react-redux";
import { Header } from "./components/Header";
import { Projects } from "./components/Projects";
import "./App.css";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Projects />
    </Provider>
  );
};
