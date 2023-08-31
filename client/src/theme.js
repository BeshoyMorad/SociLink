import { grey } from "@mui/material/colors";

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
        }
      : {
          navBar: {
            main: grey[700],
          },
          searchBar: {
            main: grey[600],
          },
        }),
  },
});

export default getDesignTokens;
