import React, { useEffect, useState } from "react";
import {
  LineChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const palletes = ["#F45050", "#F9D949", "#E8A0BF", "#AD7BE9", "#4B56D2"];

const AnalyticsChart = props => {
  const [chartData, setChartData] = useState([]);
  const [topData, setTopData] = useState([]);

  useEffect(() => {
    let tagCount = {};
    Object.entries(props.chartData).forEach(item => {
      // Count each prediction based on confidence
      item[1].forEach(pred => {
        if (pred.confidence >= props.confidence) {
          if (!(pred.tag.name in tagCount)) tagCount[pred.tag.name] = 0;
          tagCount[pred.tag.name] += 1;
        }
      });
    });
    // Get the top 5 predictions
    tagCount = Object.fromEntries(
      Object.entries(tagCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
    );
    setTopData(Object.keys(tagCount));

    const newChartData = Object.entries(props.chartData).map(item => {
      const itemTagCount = Object.fromEntries(
        Object.keys(tagCount).map(key => [key, 0])
      );

      item[1].forEach(pred => {
        if (
          pred.confidence >= props.confidence &&
          pred.tag.name in itemTagCount
        ) {
          itemTagCount[pred.tag.name] += 1;
        }
      });

      return { timestamp: parseInt(item[0], 10), ...itemTagCount };
    });

    // newChartData = distributedCopy(
    //   newChartData,
    //   Math.floor(props.videoElement.duration) + 1
    // );

    setChartData(newChartData);
  }, [props.confidence]);

  const onClickChart = e => {
    // eslint-disable-next-line no-param-reassign
    props.videoElement.currentTime = parseInt(e.activeLabel, 10) / 1000;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        onClick={e => onClickChart(e)}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis scale="number" dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend layout="vertical" align="left" verticalAlign="top" />
        {topData.map((data, idx) => (
          <Line
            dot={false}
            type="monotone"
            dataKey={data}
            stroke={palletes[idx]}
            strokeWidth="3"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

// eslint-disable-next-line no-unused-vars
function distributedCopy(items, n) {
  const elements = [items[0]];
  const totalItems = items.length - 2;
  const interval = Math.floor(totalItems / (n - 2));
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < n - 1; i++) {
    elements.push(items[i * interval]);
  }
  elements.push(items[items.length - 1]);
  return elements;
}

export default AnalyticsChart;
