import { API } from "@/constants";
import type { User } from "@/types";

export const getUsers = async (): Promise<Array<User>> => {
  const data = await API.get("/api/user").then((res) => {
    return res.data;
  });

  return data;
};
