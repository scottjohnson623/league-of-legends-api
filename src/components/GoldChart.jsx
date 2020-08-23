import React, { useEffect } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
import { useSelector, useDispatch } from "react-redux";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function GoldChart() {
  const dispatch = useDispatch();
  const matchData = useSelector((state) => {
    return state.matchData;
  });
  const chartReady = useSelector((state) => state.chartReady);
  const chartOptions = useSelector((state) => state.chartOptions);
  let setChartOptions = () => {
    console.log("Setting chart options", matchData);
    dispatch({
      type: "SET_CHARTOPTIONS",
      payload: {
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
          prefix: "W",
          interval: 1,
        },
        data: [
          {
            type: "line",
            dataPoints: matchData,
          },
        ],
      },
    });
    dispatch({ type: "TOGGLE_CHARTREADY" });
  };
  useEffect(() => {
    setChartOptions();
  }, []);
  return (
    <>
      {chartReady ? (
        <>
          <div className="chart">
            <CanvasJSChart options={chartOptions} />{" "}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
