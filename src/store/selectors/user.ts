import { State, UserData } from "@/types";

export const selectUserData = (state: State): UserData => state.user;
