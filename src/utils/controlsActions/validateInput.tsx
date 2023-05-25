import { ICommandForGame } from "../../interfaces";
import { CHARACTER_ACTIONS } from "../constants";

export const validateInput = (inputString: string): boolean => {
  if (inputString === "") {
    return false;
  }
  return !/^[a-zа-я]*\.[a-zа-я]*\([0-9]*\)$/i.test(inputString);
};

export const parseInputToObject = (parsedString: string[]): ICommandForGame => {
  if (parsedString.length === 0) {
    return {command: "empty", count: 0};
  }

  let isCorrectLine = true;

  CHARACTER_ACTIONS.forEach((item, index) => {
    if (!item.includes(parsedString[index])) {
      isCorrectLine = false;
    }
  })

  if (!isCorrectLine) {
    return {command: "error", count: 0};
  }
  
  return {command: parsedString[1], count: Number.parseInt(parsedString[2])}
}