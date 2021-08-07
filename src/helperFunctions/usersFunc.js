import _ from "lodash";
import { loading_status, sign_in_ls, sign_out } from "../redux/authReducer";
import { getUserData } from "../api";

const profileLS = localStorage.getItem("profile");

export const fetchUserData = async (user, source) => {
  try {
    const { data, status } = await getUserData(user, source);

    if (status === 200) return data.user;
  } catch (error) {
    console.log(error);
  }
};

export const backToSignIn = (history) => {
  if (profileLS === null) {
    history.push("/signin");
    return;
  }
};

export const dispatchToProfile = (dispatch, profile) => {
  if (profileLS !== null && _.isEmpty(profile)) {
    dispatch(loading_status("loading"));
    dispatch(sign_in_ls(profileLS));
  }
};

export const signOutUser = (dispatch, history) => {
  dispatch(loading_status("loading"));
  dispatch(sign_out());
  history.push("/signin");
};
