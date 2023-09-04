import { Box, Grid, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import MyPostWidget from "pages/widgets/MyPostWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";
import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.user);
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
          <UserWidget userId={user._id} />
        </Grid>

        <Grid item xs={isNonMobileScreens ? 6 : 12}>
          <MyPostWidget />
          <PostsWidget userId={user._id} />
        </Grid>

        {isNonMobileScreens && (
          <Grid item xs={3}>
            {/* Friends list */}
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default HomePage;
