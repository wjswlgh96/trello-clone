import React from "react";
import { styled } from "styled-components";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { SortableItemProps } from "../../types/props/Dnd-kit";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
  cursor: grab;
`;

function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <>
      {props.isEmpty ? (
        <Card
          ref={setNodeRef}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            cursor: "inherit",
          }}
          {...attributes}
        >
          Empty
        </Card>
      ) : (
        <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
          {props.id}
        </Card>
      )}
    </>
  );
}

export default React.memo(SortableItem);
