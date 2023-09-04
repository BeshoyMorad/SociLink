import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLikePost } from "state";

function PostWidget({ post }) {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const [isComment, setIsComment] = useState(false);
  const isLiked = Boolean(post.likes[loggedInUserId]);
  const likesCount = Object.keys(post.likes).length;

  const likePost = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${post._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(setLikePost({ postId: post._id, likes: data }));
    }
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={post.user._id}
        name={`${post.user.firstName} ${post.user.lastName}`}
        friendLocation={post.user.location}
        friendPicturePath={post.user.picturePath}
      />

      <Typography mt="1rem" fontSize="1.1rem">
        {post.description}
      </Typography>

      {post.picturePath && (
        <img
          width="100%"
          height="auto"
          style={{
            marginTop: "0.5rem",
            borderRadius: "0.75rem",
          }}
          alt="post"
          src={`http://localhost:3001/assets/${post.picturePath}`}
        />
      )}

      <FlexBetween mt="0.75rem">
        {/* Like */}
        <FlexBetween gap="0.5rem">
          <IconButton onClick={likePost}>
            {isLiked ? (
              <FavoriteIcon sx={{ color: palette.primary.main }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <Typography>{likesCount}</Typography>
        </FlexBetween>

        {/* Comment */}
        <FlexBetween>
          <IconButton onClick={() => setIsComment(!isComment)}>
            <CommentIcon />
          </IconButton>
          <Typography>{post.comments.length}</Typography>
        </FlexBetween>

        {/* Share */}
        <IconButton>
          <ShareIcon />
        </IconButton>
      </FlexBetween>

      {isComment && (
        <Box mt="1rem">
          {post.comments.map((comment, i) => (
            <Box key={`${comment}-${i}`}>
              <Divider />
              <Typography
                sx={{
                  m: "0.5rem 0",
                  pl: "0.75rem",
                }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}

export default PostWidget;
