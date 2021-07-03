import { API } from "@/constants";

export const postImage = async (formData: FormData): Promise<string> =>
  await API.post("/api/uploads", formData).then((res) => res.data.path);
