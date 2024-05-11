type State = {
  apparel?: string[];
  price?: (string | null)[];
  inStock?: string;
  newRelease?: boolean;
  error?: {
    fromError: string | null;
    toError: string | null;
  };
};

type Action =
  | { type: "SET_APPAREL"; payload: string[] }
  | { type: "SET_PRICE"; payload: (string | null)[] }
  | { type: "SET_INSTOCK"; payload: string }
  | { type: "SET_NEWRELEASE"; payload: boolean }
  | {
      type: "SET_ERROR";
      payload: { fromError: string | null; toError: string | null };
    }
  | { type: "REMOVE_ALL" }
  | { type: "APPLY_ALL"; payload: State };

export const filterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_APPAREL":
      if (action.payload.length === 0) {
        const { apparel, ...newState } = state;
        return newState;
      } else {
        return { ...state, apparel: action.payload };
      }
    case "SET_PRICE":
      if (action.payload.every((val) => val === null)) {
        const { price, ...newState } = state;
        return newState;
      } else {
        return { ...state, price: action.payload };
      }
    case "SET_INSTOCK":
      if (!action.payload || action.payload === "") {
        const { inStock, ...newState } = state;
        return newState;
      } else {
        return { ...state, inStock: action.payload };
      }
    case "SET_NEWRELEASE":
      if (!action.payload) {
        const { newRelease, ...newState } = state;
        return newState;
      } else {
        return { ...state, newRelease: action.payload };
      }
    case "SET_ERROR":
      if (
        action.payload.fromError === null &&
        action.payload.toError === null
      ) {
        const { error, ...newState } = state;
        return newState;
      } else {
        return { ...state, error: action.payload };
      }
    case "REMOVE_ALL":
      return {};
    case "APPLY_ALL":
      return action.payload;
    default:
      throw new Error();
  }
};
