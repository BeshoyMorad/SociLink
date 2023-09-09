import { Box, Grid, useMediaQuery } from "@mui/material";
import Navbar from "pages/navbar";
import FriendListWidget from "pages/widgets/FriendListWidget";
import PostsWidget from "pages/widgets/PostsWidget";
import UserWidget from "pages/widgets/UserWidget";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          p: "2rem 3%",
        }}
      >
        <Grid item xs={isNonMobileScreens ? 4 : 12}>
          <UserWidget userId={userId} />
          <Box mt="3rem" />
          <FriendListWidget userId={userId} />
        </Grid>

        <Grid item xs={isNonMobileScreens ? 6 : 12}>
          <PostsWidget userId={userId} isProfile />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;
