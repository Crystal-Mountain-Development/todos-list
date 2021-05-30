import { createMuiTheme } from "@material-ui/core/styles";
import { purple, red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[200],
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "rgba(255, 255, 255, 0.87)",
      secondary: "rgba(255, 255, 255, 0.6)",
    },
    background: {
      default: "#292929",
    },
    type: "dark",
  },
});

export default theme;
