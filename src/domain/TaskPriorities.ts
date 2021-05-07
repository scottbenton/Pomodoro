import { red, amber, green } from "@material-ui/core/colors";
import { Color } from "@material-ui/core";

interface ITaskPriority {
  [key: number]: {
    name: string;
    color: Color;
    value: number;
  };
}

export const TaskPriorities: ITaskPriority = {
  1: { name: "Low", color: green, value: 1 },
  2: { name: "Medium", color: amber, value: 2 },
  3: { name: "High", color: red, value: 3 },
};
