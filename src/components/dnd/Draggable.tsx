import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { DragAndDropProps } from "../../types/props/Dnd-kit";

export default function Draggable({ children, id }: DragAndDropProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
}
