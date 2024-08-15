import { api } from "../api";
import GraphInstance from "../instance";

interface ReturnValueLog {
  date: string;
  value: number;
}

interface CpfGraphData {
  name: string;
  valueLog: ReturnValueLog[];
}

export default async function fetchGraphinfo(
  priceId: string,
  startDate: string,
  endDate: string
) {
  return await GraphInstance.post<CpfGraphData>(api.getGraphInfo, {
    id: priceId,
    x: startDate,
    y: endDate,
  });
}
