import { createStore } from "redux";

let initialState = {
  summonerName: "",
  accountID: "",
  championID: "",
  matches: [],
  view: "main",
  championName: "",
  goldGraph: {},
  csGraph: {},
  participantID: "",
  chartOptions: {},
  chartReady: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SUMMONERNAME": {
      return { ...state, summonerName: action.payload };
    }
    case "SET_ACCOUNTID": {
      return { ...state, accountID: action.payload };
    }
    case "SET_CHAMPIONID": {
      return { ...state, championID: action.payload };
    }
    case "SET_MATCHES": {
      return { ...state, matches: action.payload };
    }
    case "SET_VIEW": {
      return { ...state, view: action.payload };
    }
    case "SET_CHAMPIONNAME": {
      return { ...state, championName: action.payload };
    }
    case "SET_GOLDGRAPH": {
      return { ...state, goldGraph: action.payload };
    }
    case "SET_PARTICIPANTID": {
      return { ...state, participantID: action.payload };
    }
    case "SET_CHARTOPTIONS": {
      return { ...state, chartOptions: action.payload };
    }
    case "TOGGLE_CHARTREADY": {
      console.log("changing chartReady to:", !state.chartReady);
      return { ...state, chartReady: !state.chartReady };
    }
    case "SET_CSGRAPH": {
      return { ...state, csGraph: action.payload };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

export default store;
