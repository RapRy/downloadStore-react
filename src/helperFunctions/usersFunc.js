// import _ from "lodash";
import { loading_status, sign_in_ls, sign_out } from "../redux/authReducer";

const profileLS = localStorage.getItem("profile");

export const backToSignIn = (history) => {
  if (profileLS === null) {
    history.push("/signin");
    return;
  }
};

export const dispatchToProfile = (dispatch) => {
  if (profileLS !== null) {
    dispatch(loading_status("loading"));
    dispatch(sign_in_ls(profileLS));
  }
};

export const signOutUser = (dispatch, history) => {
  dispatch(loading_status("loading"));
  dispatch(sign_out());
  history.push("/signin");
};
