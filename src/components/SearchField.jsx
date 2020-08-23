import axios from "axios";
import championData from "../data/champion.json";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function SearchField() {
  // pulling state in from store
  let summonerName = useSelector((state) => {
    return state.summonerName;
  });
  let championID = useSelector((state) => {
    return state.championID;
  });
  const dispatch = useDispatch();

  //populating select bar with champions
  function makechampionSelectBar() {
    let result = [];
    for (const key in championData.data) {
      result.push(
        <option
          id="championselect"
          key={key}
          value={championData.data[key].key}
          label={key}
        >
          {key}
        </option>
      );
    }
    return result;
  }
  function findChampionName(id) {
    for (const champion in championData.data) {
      if (championData.data[champion].key == id) {
        return championData.data[champion].name;
      }
    }
  }

  async function getData() {
    console.log("getData");
    try {
      let match = await axios.get(`/api/${summonerName}/${championID}`);
      console.log("match", match);
      dispatch({ type: "SET_MATCHES", payload: match.data });
    } catch (err) {
      console.log(err);
    }
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
          dispatch({
            type: "SET_CHAMPIONNAME",
            payload: findChampionName(championID),
          });
        }}
      >
        SEND IT
      </button>
    </div>
  );
}
