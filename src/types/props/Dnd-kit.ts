import React from "react";

export interface BoardProps {
  toDos: string[];
  boardId: string;
}

export interface DragAndDropProps {
  id: string;
  children: React.ReactNode;
}

export interface SortableWrapperProps {
  children: React.ReactNode;
}

export interface SortableItemProps {
  id: string;
  children?: React.ReactNode;
  isEmpty?: boolean;
}
