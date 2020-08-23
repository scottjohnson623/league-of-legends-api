import React, { useEffect } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { useSelector, useDispatch } from "react-redux";
import { MDBBtn } from "mdbreact";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GoldChart() {
  const dispatch = useDispatch();
  const goldGraph = useSelector((state) => {
    return state.goldGraph;
  });
  const csGraph = useSelector((state) => state.csGraph);
  const goldOptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Gold Gained",
    },
    axisY: {
      title: "Gold",
      interval: 500,
    },
    axisX: {
      title: "Minute",
      suffix: ":00",
      interval: 1,
    },
    data: [
      {
        type: "line",
        dataPoints: goldGraph,
      },
    ],
  };
  const csOptions = {
    theme: "light2", // "light1", "dark1", "dark2"
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Minions Killed",
    },
    axisY: {
      title: "Minions Killed",
      interval: 10,
    },
    axisX: {
      title: "Minute",
      suffix: ":00",
      interval: 1,
    },
    data: [
      {
        type: "line",
        dataPoints: csGraph,
      },
    ],
  };
  return (
    <>
      <div className="chartbody">
        <div className="chart">
          <CanvasJSChart options={goldOptions} />
          <CanvasJSChart options={csOptions} />
        </div>
        <br />
        <MDBBtn
          className="backbutton"
          color="primary"
          outline
          rounded
          onClick={() => {
            dispatch({
              type: "SET_VIEW",
              payload: "main",
            });
          }}
        >
          Go Back
        </MDBBtn>
      </div>
    </>
  );
}
