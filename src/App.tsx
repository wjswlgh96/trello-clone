import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { activeIdState, todoState } from "./recoil/atom/ToDo";

import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";

import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DndContextMemo from "./components/dnd/DndContextMemo";
import Board from "./components/Board";
import SortableItem from "./components/dnd/SortableItem";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);
  const [activeId, setActiveId] = useRecoilState(activeIdState);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId("");
      return;
    }

    const fromContainer = findContainer(active.id as string);
    const toContainer = findContainer(over.id as string) || over.id;

    if (fromContainer && toContainer) {
      if (fromContainer === toContainer) {
        const updateList = arrayMove(
          toDos[fromContainer],
          toDos[fromContainer].indexOf(active.id as string),
          toDos[fromContainer].indexOf(over.id as string)
        );

        setToDos((prev) => ({ ...prev, [fromContainer]: updateList }));
      } else {
        const newFromList = toDos[fromContainer].filter(
          (todo: string) => todo !== active.id
        );
        const newToList = [...toDos[toContainer], active.id];

        setToDos((prev: any) => {
          return {
            ...prev,
            [fromContainer]: newFromList,
            [toContainer]: newToList,
          };
        });
      }
    }

    setActiveId("");
  };

  const findContainer = (id: string): string | null => {
    return Object.keys(toDos).find((key) => toDos[key].includes(id)) || null;
  };

  return (
    <Wrapper>
      <DndContextMemo
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </Boards>

        <DragOverlay>
          {activeId ? <SortableItem id={activeId} /> : null}
        </DragOverlay>
      </DndContextMemo>
    </Wrapper>
  );
}

export default App;
