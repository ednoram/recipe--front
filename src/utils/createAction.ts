/* eslint-disable @typescript-eslint/ban-types */
const createAction = (
  type: string,
  payload: object
): { type: string; payload: object } => ({
  type,
  payload,
});

export default createAction;
