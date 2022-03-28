import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

//Using 'thunk' middleware
export const setAlert = (msg, alertType, timeout = 4000) => (dispatch) => {
  const id = uuid(); // gives us random long string

  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
