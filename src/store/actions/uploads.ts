import { API } from "@/constants";

export const postImage = async (formData: FormData): Promise<string> => {
  try {
    const { data } = await API.post("/api/uploads", formData);
    return data.path;
  } catch {
    alert("Something went wrong");
    return "";
  }
};
