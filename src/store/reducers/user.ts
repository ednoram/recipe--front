export const SET_USER_DATA = "SET_USER_DATA";

interface State {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}

interface Payload {
  data: State | null;
}

const userReducer = (
  state: State | null = null,
  { type, payload }: { type: string; payload: Payload }
): State | null => {
  switch (type) {
    case SET_USER_DATA:
      return payload.data;
    default:
      return state;
  }
};

export default userReducer;
