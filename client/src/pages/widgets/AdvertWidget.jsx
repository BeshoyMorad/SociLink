import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import Typography from "@mui/material/Typography";

function AdvertWidget(props) {
  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography fontWeight="bold">Sponsored</Typography>
        <Typography>Create Ad</Typography>
      </FlexBetween>

      <img
        src="http://localhost:3001/assets/Ad.png"
        alt="Advert"
        style={{
          width: "100%",
          height: "auto",
          margin: "0.5rem 0",
        }}
      />

      <FlexBetween>
        <Typography fontWeight="bold">Automotive</Typography>
        <Typography>automotive.com</Typography>
      </FlexBetween>

      <Typography m="0.5rem 0 0" fontSize="0.9rem">
        Drive automotive results with Meta technologies
      </Typography>
    </WidgetWrapper>
  );
}

export default AdvertWidget;
