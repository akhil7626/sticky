import { guid, setLocalStorage } from "../Utils";

export const noteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NEW_NOTE": {
      const newNotesArray = [
        ...state,
        {
          id: guid(),
          title: "new title",
          updatedDate: new Date().toLocaleString(),
          isFocused: true,
        },
      ];

      setLocalStorage("notes", newNotesArray);
      return newNotesArray;
    }

    case "TITLE_CHANGE": {
      const newNotesArray = state.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            title: action.value,
            updatedDate: new Date(),
          };
        }
        return note;
      });
      setLocalStorage("notes", newNotesArray);
      return newNotesArray;
    }
    case "CONTENT_CHANGE": {
      const newNotesArray = state.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            content: action.value,
            updatedDate: new Date(),
          };
        }
        return note;
      });
      setLocalStorage("notes", newNotesArray);
      return newNotesArray;
    }
    case "NOTE_FOCUS": {
      const newNotesArray = state.map((note) => {
        if (note.id === action.id) {
          return {
            ...note,
            isFocused: true,
          };
        } else {
          return {
            ...note,
            isFocused: false,
          };
        }
      });
      setLocalStorage("notes", newNotesArray);
      return newNotesArray;
    }
    case "NOTE_CLOSE": {
      const newNotesArray = state.filter((note) => note.id !== action.id);
      setLocalStorage("notes", newNotesArray);
      return newNotesArray;
    }
    default:
      return state;
  }
};
