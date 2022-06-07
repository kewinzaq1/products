import * as React from "react";

function useLocalStorage<T>(key: string, value: T): [T, React.Dispatch<T>] {
  const [state, setState] = React.useState(() => {
    const valueFromLocal = window.localStorage.getItem(key);
    if (valueFromLocal) {
      return JSON.parse(valueFromLocal);
    } else {
      return value;
    }
  });

  React.useEffect(() => {
    if (state) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  });

  return [state, setState];
}
function useSessionStorage<T>(key: string, value: T): [T, React.Dispatch<T>] {
  const [state, setState] = React.useState(() => {
    const valueFromLocal = window.sessionStorage.getItem(key);
    if (valueFromLocal) {
      return JSON.parse(valueFromLocal);
    } else {
      return value;
    }
  });

  React.useEffect(() => {
    if (state) {
      window.sessionStorage.setItem(key, JSON.stringify(state));
    }
  });

  return [state, setState];
}

export { useSessionStorage, useLocalStorage };
