import AsyncStateFactory from "@src/modules/StateManagement/AsyncState/AsyncStateFactory";
import axios from "axios";
import moment from "moment";
import React, { PureComponent, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import fetchGraphInfoAction from "./management/actions/fetchGraphInfoAction";

export interface RIGraph {}

export namespace PIGraph {}

export default function Graph(props: RIGraph) {
  const intialSelectedPrice = {
    name: "basic Price",
    id: "",
  };
  const [selectedPrice, setSelectedPrice] = useState(intialSelectedPrice);

  const intialGraphIInput: {
    id: string;
    x: string;
    y: string;
  } = {
    id: "647b48cffc9a5ec789cdef3a",
    x: moment().subtract(10, "days").toString(),
    y: new Date().toString(),
  };
  const [graphState, setGraphState] = useState(intialGraphIInput);

  const intialState: Graph.State = {
    data: {
      name: "basic rate",
      valueLog: [],
    },
    loading: { fetchGraphInfo: AsyncStateFactory() },
  };

  const [state, setState] = useState<Graph.State>(intialState);

  const graphInfoAction = new fetchGraphInfoAction(state, setState);

  useEffect(() => {
    graphInfoAction.fetchGraphInfoData(
      graphState.id,
      graphState.x,
      graphState.y
    );
  }, []);

  const list: { name: string; rate: number; amount: number }[] =
    state.data.valueLog.map((v) => ({
      name: v.date,
      rate: v.value,
      amount: v.value,
    }));
  return (
    <div className="flex">
      <div style={{ width: 500, height: 500 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={list}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="" style={{}}>
        <select
          value={selectedPrice.name}
          onChange={(v) => {
            setSelectedPrice({
              name: v.target.value,
              id: v.target.children[v.target.selectedIndex].id,
            });

            setGraphState({
              id: "647b48cffc9a5ec789cdef3a",//to be changed
              x: moment().subtract(10, "days").toString(),
              y: new Date().toString(),
            });
          }}
        >
          <option id={selectedPrice.id} value="">
            basic price
          </option>
          <option value="value1">deferenc</option>
          <option value="value2">dis</option>
        </select>
      </div>
    </div>
  );
}
