export const SEND_EMAIL = "SEND_EMAIL";
export const SET_USER_DATA = "SET_USER_DATA";
export const REGISTER_USER = "REGISTER_USER";

interface State {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}

interface Action {
  type: string;
  payload: {
    data: State | null;
  };
}

const userReducer = (
  state: State | null = null,
  { type, payload }: Action
): State | null => {
  switch (type) {
    case SET_USER_DATA:
      return payload.data;
    default:
      return state;
  }
};

export default userReducer;
