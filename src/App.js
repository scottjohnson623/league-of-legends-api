import React from "react";
import { useSelector } from "react-redux";
import "./styles/App.css";
import SearchField from "./components/SearchField";
import Matches from "./components/Matches";
import GoldChart from "./components/GoldChart";

function App() {
  const view = useSelector((state) => state.view);
  return (
    <>
      <SearchField />
      {view === "main" ? <Matches /> : <></>}
      {view === "charts" ? <GoldChart /> : <></>}
    </>
  );
}

export default App;
