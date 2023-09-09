import { Avatar, Box, IconButton, useTheme, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import { useNavigate } from "react-router-dom";

function Friend({ friendId, name, friendLocation, friendPicturePath }) {
  const { _id, friends } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { palette } = useTheme();

  const isFriend = friends.find((friend) => friend._id === friendId);

  const addRemoveFriend = async () => {
    const add = !isFriend;

    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ add }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    }
  };

  return (
    <FlexBetween gap="1rem">
      <FlexBetween gap="1rem">
        <Avatar src={`http://localhost:3001/assets/${friendPicturePath}`} />
        <Box>
          <Typography
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
            variant="h6"
            sx={{
              "&:hover": {
                color: palette.primary.main,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography fontSize="0.9rem">{friendLocation}</Typography>
        </Box>
      </FlexBetween>

      {_id !== friendId && (
        <IconButton
          onClick={addRemoveFriend}
          sx={{
            p: "0.6rem",
            bgcolor: palette.addFriendBtn.main,
            borderRadius: "3rem",
            "&:hover": {
              bgcolor: palette.addFriendBtn.main,
            },
          }}
        >
          {isFriend ? <PersonRemoveIcon /> : <PersonAddIcon />}
        </IconButton>
      )}
    </FlexBetween>
  );
}

export default Friend;
