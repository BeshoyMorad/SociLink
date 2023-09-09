import { Box, Grid, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import AdvertWidget from "pages/widgets/AdvertWidget";
import FriendListWidget from "pages/widgets/FriendListWidget";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";
import { useSelector } from "react-redux";

function HomePage() {
  const userId = useSelector((state) => state.user._id);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Navbar />

      <Grid
        container
        spacing={3}
        sx={{
          p: "2rem 3%",
        }}
      >
        <Grid item xs={isNonMobileScreens ? 3 : 12}>
          <UserWidget userId={userId} />
        </Grid>

        <Grid item xs={isNonMobileScreens ? 6 : 12}>
          <MyPostWidget />
          <PostsWidget userId={userId} />
        </Grid>

        {isNonMobileScreens && (
          <Grid item xs={3}>
            <AdvertWidget />
            <Box mt="3rem" />
            <FriendListWidget userId={userId} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default HomePage;
