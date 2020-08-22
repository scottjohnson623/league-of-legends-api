import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import championData from "./data/champion.json";

function App() {
  let [summonerName, setSummonerName] = useState("");
  let [accountID, setAccountID] = useState("");
  let [championID, setChampionID] = useState();
  let [matches, setMatches] = useState([]);
  let [view, setView] = useState("main");

  function makechampionSelectBar() {
    let result = [];
    for (const key in championData.data) {
      result.push(
        <option key={key} value={championData.data[key].key}>
          {key}
        </option>
      );
    }
    return result;
  }

  async function getData() {
    try {
      let match = await axios.get(`/${summonerName}/${championID}`);
      setMatches(match.data);
    } catch (err) {
      console.log(err);
    }
  }
  function postMatchData() {
    console.log("matches.data", matches.data);
    return matches.map((elem) => {
      return <p>{elem.gameId}</p>;
    });
  }
  return (
    <div className="App">
      Summoner Name:{" "}
      <input
        type="text"
        onChange={(e) => {
          setSummonerName(e.target.value);
        }}
      ></input>{" "}
      {summonerName}
      <br />
      Champion:
      <select
        name="Champion"
        label="champion"
        onChange={(e) => {
          setChampionID(e.target.value);
        }}
      >
        {makechampionSelectBar()}
      </select>
      {championID}
      <br />
      <button
        onClick={() => {
          getData();
        }}
      >
        SEND IT
      </button>
      {postMatchData()}
    </div>
  );
}

export default App;
