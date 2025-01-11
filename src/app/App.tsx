import { Outlet } from "react-router";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  MantineColorsTuple,
  createTheme,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "react-query";

const popRed: MantineColorsTuple = [
  "#ffe8eb",
  "#ffcfd4",
  "#ff9ca6",
  "#fe6575",
  "#fd394c",
  "#fd1e32",
  "#fe0f24",
  "#e30018",
  "#cb0014",
  "#b1000e",
];

const theme = createTheme({
  colors: {
    popRed,
  },
  primaryColor: "popRed",
  defaultRadius: "xl",
  cursorType: "pointer",
  headings: {
    fontFamily: "Trap",
    fontWeight: "800",
  },
  components: {
    Button: {},
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <ModalsProvider>
            <Outlet />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
