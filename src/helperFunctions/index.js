import _ from "lodash";
import { loading_status, sign_in_ls } from "../redux/authReducer";

const profileLS = localStorage.getItem("profile");

export const backToSignIn = (profile, history) => {
  if (profileLS === null && _.isEmpty(profile)) {
    history.push("/signin");
    return;
  }
};

export const dispatchToProfile = (profile, dispatch) => {
  if (_.isEmpty(profile) && !_.isEmpty(profileLS)) {
    dispatch(loading_status("loading"));
    dispatch(sign_in_ls(profileLS));
  }
};
