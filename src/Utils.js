import * as React from "react";

export const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export function setLocalStorage(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key) {
  const valueInLocalStorage = window.localStorage.getItem(key);
  if (valueInLocalStorage) {
    return JSON.parse(valueInLocalStorage);
  }
  return undefined;
}

export function useLocalStorageState(key, defaultValue = "") {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return JSON.parse(valueInLocalStorage);
    }
    return defaultValue;
  });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
