import styled from "styled-components";
import CSVReader from "../../components/upload/FileUpload";
import { getTestData } from "../../features/demo/utils";
import { handleFileSubmit } from "../../components/upload/utils";

function Demo() {
  return (
    <>
      <CSVReader handleFile={handleFileSubmit} />
      <TestButton onClick={getTestData}>hello</TestButton>
    </>
  );
}

const TestButton = styled.button`
  font-family: "Trap";
`;

export default Demo;
