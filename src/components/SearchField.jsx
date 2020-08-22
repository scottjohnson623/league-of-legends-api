import axios from "axios";
import championData from "../data/champion.json";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SearchField() {
  // pulling state in from store
  let summonerName = useSelector((state) => {
    return state.summonerName;
  });
  let accountID = useSelector((state) => {
    return state.accountID;
  });
  let championID = useSelector((state) => {
    return state.championID;
  });
  let matches = useSelector((state) => {
    return state.matches;
  });
  let view = useSelector((state) => {
    return state.view;
  });
  const dispatch = useDispatch();
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
      dispatch({ type: "SET_MATCHES", payload: match.data });
    } catch (err) {
      console.log(err);
    }
  }
  function postMatchData() {
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
          dispatch({ type: "SET_SUMMONERNAME", payload: e.target.value });
        }}
      ></input>{" "}
      {summonerName}
      <br />
      Champion:
      <select
        name="Champion"
        label="champion"
        onChange={(e) => {
          dispatch({ type: "SET_CHAMPIONID", payload: e.target.value });
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
