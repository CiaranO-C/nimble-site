import styles from "./upload.module.css";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { useState } from "react";
import { ErrorCodes } from "./type";
import { BounceLoader } from "react-spinners";
import { errorMap, submitFile } from "./utils.ts";
import { Stack, Text } from "@mantine/core";
import DropErrorMsg from "../../features/preview/DropErrorMsg";

function CustomDropzone() {
  const [dropzoneKey, toggleDropzoneKey] = useToggle([0, 1]);
  const [errorCode, setErrorCode] = useState<ErrorCodes | null>(null);
  const [loading, handler] = useDisclosure();

  function handleFileReject(errorCode: string) {
    if (errorCode in errorMap) {
      setErrorCode(errorCode as ErrorCodes);
    }
    //resets inner text after reject
    setTimeout(() => {
      toggleDropzoneKey();
    }, 2000);
  }

  async function handleSubmit(files: FileWithPath[]): Promise<void> {
    setErrorCode(null);
    handler.open();
    const statusCode = await submitFile(files);
    if (statusCode === 422) setErrorCode(422);
    handler.close();
  }

  return (
    <>
      <Dropzone
        mt={75}
        onDragOver={() => {
          if (errorCode === "file-invalid-type") setErrorCode(null);
        }}
        key={dropzoneKey}
        maxFiles={1}
        multiple={false}
        loading={loading}
        loaderProps={{
          children: <BounceLoader color="red" loading size={45} />,
        }}
        classNames={{
          root: styles.dropZoneRoot,
          inner: styles.dropZoneInner,
        }}
        onDrop={handleSubmit}
        onReject={(reject) => {
          const { code } = reject[0].errors[0];
          handleFileReject(code);
        }}
        accept={{
          "text/csv": [".csv"],
        }}
      >
        <Stack align="center" justify="center" pos="relative">
          <Text ta="center">
            Click to upload or
            <br /> drag and drop your sales file here
          </Text>
          <Text className={styles.csvWarning}>File not valid</Text>
        </Stack>
      </Dropzone>
      <div style={{ minHeight: "40px" }}>
        {errorCode && (
          <DropErrorMsg
            message={errorMap[errorCode]}
            button={errorCode === "too-many-files"}
            classes={{ text: styles.errorMessage, button: styles.errorButton }}
          />
        )}
      </div>
    </>
  );
}

export default CustomDropzone;
