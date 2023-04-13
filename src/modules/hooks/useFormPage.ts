import { useReducer, useState } from 'react';

export enum Action {
  GO_FRONT,
  GO_BACK,
}

function CreateReducer(pages: number) {
  return function (state: number, action: Action) {
    switch (action) {
      case Action.GO_BACK: {
        if (state === 0) return state;
        else return state - 1;
      }
      case Action.GO_FRONT: {
        if (state >= pages) return 3;
        else return state + 1;
      }
    }
  };
}

export default function useFormPage(pages: number) {
  const [page, setPage] = useState(0);
  const next = () =>
    setPage((prev) => {
      if (prev === pages) return prev;
      else return prev + 1;
    });
  const back = () =>
    setPage((prev) => {
      if (prev === 0) return 0;
      else return prev - 1;
    });
  return { page, next, back };
}
