import { API } from "@/constants";
import type { User } from "@/types";

export const getUsers = async (): Promise<Array<User>> =>
  await API.get("/api/user").then((res) => res.data);
