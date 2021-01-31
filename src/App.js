import { connect } from "react-redux";
import Note from "./Note";
import "./App.css";

const App = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        {props.notesArray.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              showClose={props.notesArray.length > 1}
            ></Note>
          );
        })}
      </header>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    notesArray: state,
  };
}

export default connect(mapStateToProps)(App);
