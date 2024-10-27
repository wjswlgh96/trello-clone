import { atom } from "recoil";
import { ToDoState } from "../../types/data/ToDo";

export const todoState = atom<ToDoState>({
  key: "toDo",
  default: {
    "To Do": ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});

export const activeIdState = atom({
  key: "activeId",
  default: "",
});
