import "./App.scss";
import Headers from "./components/Headers";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
function App() {
  return (
    <div className="app-container">
      <Headers />
      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
