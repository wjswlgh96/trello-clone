import { useDroppable } from "@dnd-kit/core";
import { DragAndDropProps } from "../../types/props/Dnd-kit";
import { styled } from "styled-components";
export default function Droppable({ id, children }: DragAndDropProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="droppable">
      {children}
    </div>
  );
}
