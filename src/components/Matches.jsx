import React from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";

export default function Matches() {
  //importing state
  let matches = useSelector((state) => {
    return state.matches;
  });
  let summonerName = useSelector((state) => {
    return state.summonerName;
  });
  let championName = useSelector((state) => {
    return state.championName;
  });
  const dispatch = useDispatch();
  //functions to generate datapoints and bring up charts.
  function generateGoldDataPoints(object, participant) {
    let datapoints = [];
    object.frames.forEach((frame, i) => {
      let userData;
      for (const part in frame.participantFrames) {
        if (frame.participantFrames[part].participantId == participant) {
          userData = frame.participantFrames[part];
        }
      }
      datapoints.push({ x: i, y: userData.totalGold });
    });
    return datapoints;
  }

  async function analyzeGame(id) {
    let matchId = id.substring(0, 10);
    let participant = id.substring(10);
    let timeline = await axios.get(`matchtimeline/${matchId}`);
    let datapoints = generateGoldDataPoints(timeline.data, participant);
    console.log("datapoints", datapoints);
    dispatch({ type: "SET_MATCHDATA", payload: datapoints });
    dispatch({ type: "SET_VIEW", payload: "charts" });
  }
  //function to make cards of match history
  function postMatchData() {
    return matches.map((elem, i) => {
      //finding player participant ID
      let playerParticipantId = elem.matchData.participantIdentities.find(
        (elem) => {
          return (
            elem.player.summonerName.toUpperCase() ===
            summonerName.toUpperCase()
          );
        }
      ).participantId;
      let playerInfo = elem.matchData.participants[playerParticipantId - 1];
      playerInfo = playerInfo.stats;
      const imgSrc = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${championName}.png`;
      let divId = JSON.stringify(elem.gameId).concat(
        JSON.stringify(playerParticipantId)
      );
      console.log(divId);
      return (
        <div
          key={i}
          id={divId}
          className="matchcard"
          onClick={(e) => {
            analyzeGame(e.target.id);
          }}
        >
          Date:{moment(elem.timestamp).format("MMMM Do YYYY, h:mm:ss a")} <br />
          Match ID : {elem.gameId} <br />
          {playerInfo.win ? <>Won the game!</> : <>Lost the game!</>}
          <br />
          Gold earned: {playerInfo.goldEarned}
          <br />
          K/D/A: {playerInfo.kills} /{playerInfo.deaths} /{playerInfo.assists}
          <br />
          CS:
          {playerInfo.totalMinionsKilled}
          Img:
          <img src={imgSrc} alt="championIcon" />
          ParticipantID: {playerParticipantId}
          <br />
        </div>
      );
    });
  }
  return (
    <>
      <div className="matches">{postMatchData()}</div>
    </>
  );
}
