import { FileWithPath } from "@mantine/dropzone";
import { customFetch } from "../../api/customFetch";

async function submitFile(files: FileWithPath[]): Promise<number> {
  try {
    // handler.open();
    const formData = new FormData();
    formData.append("csv", files[0]);
    const res = await customFetch({
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const response = await res.json();
      sessionStorage.setItem("popstatsUserId", response.userId);
    }

    return res.status;
  } catch (error) {
    console.error("error uploading file", error);
    return 500;
  }
}

const errorMap = {
  422: "This file is already uploaded",
  "too-many-files": "Sign up for multi-file uploads!",
  "file-invalid-type": "Oops! Please upload CSV files only",
} as const;

export { submitFile, errorMap };
