import { NameIdPair } from "./NameIdPair";

export default interface ChangeLog {
  date: Date;
  by: NameIdPair
}