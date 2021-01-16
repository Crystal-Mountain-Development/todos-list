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
      primary: "#fff",
    },
    background: {
      default: "#292929",
    },
    type: "dark",
  },
});

export default theme;
