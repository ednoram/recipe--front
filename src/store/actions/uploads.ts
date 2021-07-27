import { API } from "@/constants";

export const postImage = async (
  formData: FormData
): Promise<{ imageId: string; imageUrl: string }> => {
  try {
    const { data } = await API.post("/api/uploads", formData);
    return data;
  } catch {
    alert("Something went wrong");
    return { imageId: "", imageUrl: "" };
  }
};
