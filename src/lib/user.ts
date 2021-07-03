import { User } from "@/types";
import { API } from "@/constants";

export const getUsers = async (): Promise<User[]> =>
  await API.get("/api/user").then((res) => res.data);
