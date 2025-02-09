import { DecisionPopupType } from "../enums/desicion-popup-type.enum";

export interface DecisionPopupData {
  type: DecisionPopupType;
  title: string;
  message: string;
}