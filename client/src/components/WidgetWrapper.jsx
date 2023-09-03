import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.widgetBG.main,
}));

export default WidgetWrapper;
