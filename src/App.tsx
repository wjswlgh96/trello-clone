import { List, arrayMove } from "react-movable";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { todoState } from "./recoil/atom/ToDo";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoState);

  return (
    <Wrapper>
      <Boards>
        <List
          values={toDos}
          onChange={({ oldIndex, newIndex }) =>
            setToDos(arrayMove(toDos, oldIndex, newIndex))
          }
          renderList={({ children, props }) => (
            <Board {...props}>{children}</Board>
          )}
          renderItem={({ value, props }) => (
            <Card {...props} key={+value}>
              {value}
            </Card>
          )}
        />
      </Boards>
    </Wrapper>
  );
}

export default App;
