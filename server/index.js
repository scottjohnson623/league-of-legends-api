// server/app.js
const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 9000;
require("dotenv").config();

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.json());

app.get("/api/:summonername/:champid", async (req, res) => {
  if (req.params.summonername === "src") {
    return res.send();
  }
  let summ_id = await axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonername}?api_key=${process.env.api_key}`
  );
  summ_id = summ_id.data.accountId;
  let match_data = await axios.get(
    `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summ_id}?champion=${req.params.champid}&api_key=${process.env.api_key}`
  );
  match_data = match_data.data;
  match_data = match_data.matches
    .filter((match) => {
      return match.queue == 420;
    })
    .slice(0, 10);
  for (const elem of match_data) {
    let match = await axios.get(
      `https://na1.api.riotgames.com/lol/match/v4/matches/${elem.gameId}?api_key=${process.env.api_key}`
    );
    elem.matchData = match.data;
  }
  matchData = res.status(200).send(match_data);
});

//get match timeline info

app.get("/matchtimeline/:matchId", async (req, res) => {
  let matchTimeline = await axios.get(
    `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${req.params.matchId}?api_key=${process.env.api_key}`
  );
  console.log(matchTimeline.data);
  res.send(matchTimeline.data);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

(async () => {
  try {
    console.log("Starting express...");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (err) {
    console.error("Error starting app!", err);
    process.exit(-1);
  }
})();
