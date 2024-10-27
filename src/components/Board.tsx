import { styled } from "styled-components";
import { BoardProps } from "../types/props/Dnd-kit";

import SortableContextMemo from "./dnd/SortableContextMemo";
import SortableItem from "./dnd/SortableItem";
import { verticalListSortingStrategy } from "@dnd-kit/sortable";

const Wrapper = styled.div`
  padding: 20px 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

export default function Board({ toDos, boardId }: BoardProps) {
  return (
    <SortableContextMemo items={toDos} strategy={verticalListSortingStrategy}>
      <Wrapper>
        <Title>{boardId}</Title>
        {toDos.length !== 0 ? (
          toDos.map((todo) => <SortableItem key={todo} id={todo} />)
        ) : (
          <SortableItem id={boardId} isEmpty />
        )}
      </Wrapper>
    </SortableContextMemo>
  );
}
