import { createStore } from "redux";

let initialState = {
  summonerName: "",
  accountID: "",
  championID: "",
  matches: [],
  view: "main",
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
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

export default store;
