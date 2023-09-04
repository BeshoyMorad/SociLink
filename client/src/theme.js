import { blueGrey, grey } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          navBar: {
            main: grey[300],
          },
          searchBar: {
            main: grey[400],
          },
          loginForm: {
            headerBG: grey[300],
            FormBG: grey[200],
          },
          widgetBG: {
            main: blueGrey[50],
          },
          inputBaseBG: {
            main: grey[300],
          },
          addFriendBtn: {
            main: "#2196f3",
          },
        }
      : {
          navBar: {
            main: grey[700],
          },
          searchBar: {
            main: grey[600],
          },
          loginForm: {
            headerBG: grey[700],
            FormBG: grey[800],
          },
          widgetBG: {
            main: grey[600],
          },
          inputBaseBG: {
            main: grey[500],
          },
          addFriendBtn: {
            main: "#1769aa",
          },
        }),
  },
});

export default getDesignTokens;
