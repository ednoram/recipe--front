import { API_URL } from "@/constants";

const getImageURL = (imagePath?: string): string =>
  imagePath ? `${API_URL}/api/${imagePath?.replace(/\\/g, "/")}` : "";

export default getImageURL;
