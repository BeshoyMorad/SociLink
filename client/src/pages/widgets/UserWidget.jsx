import { Avatar, Box, Divider, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function UserWidget({ userId }) {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const { palette } = useTheme();

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

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      {/* First Row */}
      <FlexBetween gap="0.8rem" pb="1rem">
        <FlexBetween gap="1rem">
          <Avatar src={`http://localhost:3001/assets/${user.picturePath}`} />
          <Box>
            <Typography
              onClick={() => navigate(`/profile/${userId}`)}
              variant="h6"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography>{user.friends.length} Friends</Typography>
          </Box>
        </FlexBetween>

        <ManageAccountsIcon
          onClick={() => navigate(`/profile/${userId}`)}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        />
      </FlexBetween>

      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnIcon />
          <Typography>{user.location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkIcon />
          <Typography>{user.occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* Third Row */}
      <Box p="1rem 0">
        <FlexBetween gap="0.5rem" mb="0.5rem">
          <Typography>Who's viewed your profile</Typography>
          <Typography fontWeight="bold">{user.viewedProfile}</Typography>
        </FlexBetween>
        <FlexBetween gap="0.5rem">
          <Typography>Impressions of your posts</Typography>
          <Typography fontWeight="bold">{user.impressions}</Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Fourth Row */}
      <Box p="1rem 0 0">
        <Typography fontWeight="500" fontSize="1.3rem" mb="0.7rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="0.8rem" mb="0.5rem">
          <FlexBetween gap="0.7rem">
            <TwitterIcon fontSize="large" />
            <Box>
              <Typography fontWeight="500">Twitter</Typography>
              <Typography>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditIcon />
        </FlexBetween>
        <FlexBetween gap="0.8rem">
          <FlexBetween gap="0.7rem">
            <LinkedInIcon fontSize="large" />
            <Box>
              <Typography fontWeight="500">LinkedIn</Typography>
              <Typography>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditIcon />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}

export default UserWidget;
