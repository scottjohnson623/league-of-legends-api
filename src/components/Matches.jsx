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
  function generateCSDataPoints(object, participant) {
    let datapoints = [];
    object.frames.forEach((frame, i) => {
      let userData;
      for (const part in frame.participantFrames) {
        if (frame.participantFrames[part].participantId == participant) {
          userData = frame.participantFrames[part];
        }
      }
      datapoints.push({ x: i, y: userData.minionsKilled });
    });
    return datapoints;
  }

  async function analyzeGame(id) {
    let matchId = id.substring(0, 10);
    let participant = id.substring(10);
    let timeline = await axios.get(`matchtimeline/${matchId}`);
    let golddatapoints = generateGoldDataPoints(timeline.data, participant);
    let csdatapoints = generateCSDataPoints(timeline.data, participant);
    dispatch({ type: "SET_GOLDGRAPH", payload: golddatapoints });
    dispatch({ type: "SET_CSGRAPH", payload: csdatapoints });
    dispatch({ type: "SET_VIEW", payload: "charts" });
    dispatch({ type: "TOGGLE_LOADING" });
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
      return (
        <>
          {" "}
          {playerInfo.win ? (
            <div
              key={i}
              id={divId}
              className="matchcardwin"
              onClick={(e) => {
                dispatch({ type: "TOGGLE_LOADING" });
                analyzeGame(divId);
              }}
            >
              <div className="splash">
                <img className="splashimg" src={imgSrc} alt="championIcon" />
              </div>
              <div className="cardtext">
                <b>
                  {moment(elem.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                </b>
                <br />
                <b>Match ID</b> : {elem.gameId} <br />
                {playerInfo.win ? (
                  <>
                    <b>Won the game!</b>
                  </>
                ) : (
                  <>Lost the game!</>
                )}
                <br />
                <b>Gold earned</b>: {playerInfo.goldEarned}
                <br />
                <b>K/D/A</b>: {playerInfo.kills} /{playerInfo.deaths} /
                {playerInfo.assists}
                <br />
                <b>CS</b>:{playerInfo.totalMinionsKilled}
              </div>
            </div>
          ) : (
            <div
              key={i}
              id={divId}
              className="matchcardloss"
              onClick={(e) => {
                dispatch({ type: "TOGGLE_LOADING" });
                analyzeGame(divId);
              }}
            >
              <div className="splash">
                <img class="splashimg" src={imgSrc} alt="championIcon" />
              </div>
              <div className="cardtext">
                <b>
                  {moment(elem.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
                </b>
                <br />
                <b>Match ID</b> : {elem.gameId} <br />
                {playerInfo.win ? (
                  <>
                    <b>Won the game!</b>
                  </>
                ) : (
                  <>
                    <b>Lost the game!</b>
                  </>
                )}
                <br />
                <b>Gold earned</b>: {playerInfo.goldEarned}
                <br />
                <b>K/D/A</b>: {playerInfo.kills} /{playerInfo.deaths} /
                {playerInfo.assists}
                <br />
                <b>CS</b>:{playerInfo.totalMinionsKilled}
              </div>
            </div>
          )}
        </>
      );
    });
  }
  return (
    <>
      <div className="matches">{postMatchData()}</div>
    </>
  );
}
