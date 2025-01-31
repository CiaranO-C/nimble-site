import { Divider, Flex, Grid, Image, Stack, Text, Title } from "@mantine/core";
import sellingHub from "../../../public/images/selling-hub.png";
import downloadModal from "../../../public/images/download-modal.png";
import mainPage from "../../../public/images/main-page.png";
import fileDrag from "../../../public/images/file-drag.png";
import {
  IconNumber1,
  IconNumber2,
  IconNumber3,
  IconNumber4,
} from "@tabler/icons-react";

function Help() {
  return (
    <>
      <Grid>
        <Grid.Col span={12} mt={"xl"}>
          <Title order={1} ta={"center"}>
            How to Download Your Depop Sales
          </Title>
        </Grid.Col>
        <Grid.Col span={12}>
          <Divider
            w={"100%"}
            label={
              <Flex
                justify={"center"}
                align={"center"}
                style={{
                  padding: "15px",
                  border: "1px solid red",
                  borderRadius: "50%",
                }}
              >
                <IconNumber1 height={"20px"} width={"20px"} />
              </Flex>
            }
            size={"sm"}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Title order={2}>Step 1: Navigate to your Depop Selling Hub</Title>
            <Text>
              Once logged into your Depop account, navigate to your selling hub
              by selecting your profile image and then 'Your selling hub' from
              the dropdown.
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Image radius={"md"} src={mainPage} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid.Col span={12}>
            <Divider
              w={"100%"}
              label={
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{
                    padding: "15px",
                    border: "1px solid red",
                    borderRadius: "50%",
                  }}
                >
                  <IconNumber2 height={"20px"} width={"20px"} />
                </Flex>
              }
              size={"sm"}
            />
          </Grid.Col>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Title order={2}>Step 2: Navigate to the Download Sales link</Title>
            <Text>
              Select Stats from the menu along the side of the screen and you'll
              find a small link in the top right to download your sales!
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Image radius={"md"} src={sellingHub} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid.Col span={12}>
            <Divider
              w={"100%"}
              label={
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{
                    padding: "15px",
                    border: "1px solid red",
                    borderRadius: "50%",
                  }}
                >
                  <IconNumber3 height={"20px"} width={"20px"} />
                </Flex>
              }
              size={"sm"}
            />
          </Grid.Col>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Title order={2}>
              Step 3: Select the dates you want to download
            </Title>
            <Text>
              Select the dates containing the sales information you wish to
              download and click the download button. This will download a CSV
              file to your downloads folder... nearly there!
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Image radius={"md"} src={downloadModal} />
        </Grid.Col>
        <Grid.Col span={12}>
          <Grid.Col span={12}>
            <Divider
              w={"100%"}
              label={
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{
                    padding: "15px",
                    border: "1px solid red",
                    borderRadius: "50%",
                  }}
                >
                  <IconNumber4 height={"20px"} width={"20px"} />
                </Flex>
              }
              size={"sm"}
            />
          </Grid.Col>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack>
            <Title order={2}>
              Step 4: Drag your file into the Popstats dropzone!
            </Title>
            <Text>
              Simply drag and drop your newly downloaded file into the dropzone,
              alternatively click anywhere within and choose the file from your
              file explorer. Now sit back and let Popstats do the work!
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={6}>
          <Image radius={"md"} src={fileDrag} />
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Help;
