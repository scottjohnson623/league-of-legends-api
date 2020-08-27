import React from "react";
import { useSelector } from "react-redux";
import "./styles/App.css";
import SearchField from "./components/SearchField";
import Matches from "./components/Matches";
import GoldChart from "./components/GoldChart";
import Header from "./components/Header";
function App() {
  const view = useSelector((state) => state.view);
  const loading = useSelector((state) => state.loading);
  return (
    <div>
      <Header />
      <div className="body">
        {loading ? (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        ) : (
          <></>
        )}
        {view === "main" ? (
          <>
            <SearchField />
            <Matches />
          </>
        ) : (
          <></>
        )}
        {view === "charts" ? <GoldChart /> : <></>}
      </div>
    </div>
  );
}

export default App;
