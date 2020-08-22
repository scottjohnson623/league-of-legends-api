// server/app.js
const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios");
const PORT = process.env.PORT || 9000;
require("dotenv").config();

app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(express.json());

let api_key = "RGAPI-1ee5419d-7e4f-4a3c-b8ee-15ebc1313e68";

//get matches for a summoner on a certain champion

app.get("/:summonername/:champid", async (req, res) => {
  let summ_id = await axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.summonername}?api_key=${process.env.api_key}`
  );
  summ_id = summ_id.data.accountId;
  let match_data = await axios.get(
    `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summ_id}?champion=${req.params.champid}&api_key=${process.env.api_key}`
  );
  match_data = match_data.data;

  console.log(match_data.matches);
  res.status(200).send(match_data.matches);
});

//get general match info

app.get("/match/:matchId", async (req, res) => {
  let matchData = await axios.get(
    `https://na1.api.riotgames.com/lol/match/v4/matches/${req.params.matchId}?api_key=${process.env.api_key}`
  );
  res.status(200).send(matchData.data);
});

//get match timeline info

app.get("/matchtimeline/:matchId", async (req, res) => {
  let matchTimeline = await axios.get(
    `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${req.params.matchId}?api_key=${process.env.api_key}`
  );
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
