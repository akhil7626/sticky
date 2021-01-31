import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import "./Note.css";

const Note = (props) => {
  const containerRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    dragElement();
  }, []);

  const dragElement = () => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    var elmnt = containerRef.current;
    titleRef.current.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      if (e.target.id === "add-icon" || e.target.id === "close-icon") {
        return;
      }
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      elmnt.style.position = "absolute";
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  const handleAddNewNote = (event) => {
    event.stopPropagation();
    props.onAddNewNote();
  };

  const handleTitleChange = (event) => {
    props.onTitleChange(props.note.id, event.target.value);
  };

  const handleContentChange = (event) => {
    props.onContentChange(props.note.id, event.target.value);
  };

  const handleNoteFocus = () => {
    props.onNoteFocus(props.note.id);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    props.onClose(props.note.id);
  };

  return (
    <div
      ref={containerRef}
      className={`Note-Container ${props.note.isFocused ? "focused" : ""}`}
      onClick={handleNoteFocus}
    >
      <div ref={titleRef} className="Note-Title-Container">
        <div
          id="add-icon"
          className="fa fa-plus"
          onClick={handleAddNewNote}
        ></div>
        <textarea
          className="Note-Title"
          value={props.note.title}
          onChange={handleTitleChange}
        />
        {props.showClose && (
          <div
            id="close-icon"
            className="fa fa-times"
            onClick={handleClose}
          ></div>
        )}
      </div>
      <textarea
        className="Note-Content"
        value={props.note.content}
        onChange={handleContentChange}
      />
      <div className="Note-Updated">
        {new Date(props.note.updatedDate).toLocaleString()}
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    onAddNewNote: () => dispatch({ type: "ADD_NEW_NOTE" }),
    onTitleChange: (id, value) => dispatch({ type: "TITLE_CHANGE", id, value }),
    onContentChange: (id, value) =>
      dispatch({ type: "CONTENT_CHANGE", id, value }),
    onNoteFocus: (id) => dispatch({ type: "NOTE_FOCUS", id }),
    onClose: (id) => dispatch({ type: "NOTE_CLOSE", id }),
  };
}

export default connect(null, mapDispatchToProps)(Note);
