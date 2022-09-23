import { BUTTON_LOADER } from "../actions";

const initialState = false;

const buttonLoaderReducer = (
  state = initialState,
  action: { type: any; payload: any }
) => {
  const { type, payload } = action;
  switch (type) {
    case BUTTON_LOADER:
      return !state;

    default:
      return state;
  }
};

export default buttonLoaderReducer;