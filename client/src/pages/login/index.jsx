import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Form from "./Form";

function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  return (
    <Box>
      <Box
        width="100%"
        textAlign="center"
        bgcolor={theme.palette.loginForm.headerBG}
        p="1rem 6%"
      >
        <Typography color="primary" fontWeight="bold" fontSize="34px">
          SociLink
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="10px"
        bgcolor={theme.palette.loginForm.FormBG}
      >
        <Typography
          variant="h6"
          fontWeight="500"
          mb="1.5rem"
          textAlign="center"
        >
          Welcome to SociLink, the Social Media for Sociopaths!
        </Typography>

        <Form />
      </Box>
    </Box>
  );
}

export default LoginPage;
