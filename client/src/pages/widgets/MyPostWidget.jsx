import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import { setPosts } from "state";

function MyPostWidget() {
  const [postDescription, setPostDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const dispatch = useDispatch();
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  const handlePost = async () => {
    const formData = new FormData();

    formData.append("userId", _id);
    formData.append("description", postDescription);
    if (isImage) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setPosts(data));

      // Clear the form
      setPostDescription("");
      setImage(null);
      setIsImage(false);
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1rem" mb="1.5rem">
        <Avatar src={`http://localhost:3001/assets/${picturePath}`} />
        <InputBase
          required
          placeholder="What's on your mind..."
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
          sx={{
            width: "100%",
            bgcolor: palette.inputBaseBG.main,
            p: "0.5rem 1.5rem",
            borderRadius: "1.5rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box
          border={`1px solid ${palette.primary.light}`}
          borderRadius="5px"
          p="1rem"
        >
          <FlexBetween gap="1rem">
            <Dropzone
              accept={{
                "image/png": [".png"],
                "image/jpeg": [".jpg", ".jpeg"],
              }}
              onDrop={(acceptedFiles) => {
                setImage(acceptedFiles[0]);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  borderRadius="5px"
                  p="1rem"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />

                  {!image ? (
                    <Typography>Add Image Here</Typography>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditIcon />
                    </FlexBetween>
                  )}
                </Box>
              )}
            </Dropzone>

            {image && (
              <IconButton color="error" onClick={() => setImage(null)}>
                <DeleteIcon />
              </IconButton>
            )}
          </FlexBetween>
        </Box>
      )}

      <Divider sx={{ margin: "1rem 0" }} />

      <FlexBetween>
        <FlexBetween
          gap="0.4rem"
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => setIsImage(!isImage)}
        >
          <ImageIcon />
          <Typography>Image</Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.4rem" sx={{ "&:hover": { cursor: "pointer" } }}>
              <OndemandVideoIcon />
              <Typography>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.4rem" sx={{ "&:hover": { cursor: "pointer" } }}>
              <AttachFileIcon />
              <Typography>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.4rem" sx={{ "&:hover": { cursor: "pointer" } }}>
              <MicIcon />
              <Typography>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <MoreHorizIcon />
          </>
        )}

        <Button
          sx={{
            bgcolor: palette.primary.main,
            color: palette.primary.contrastText,
            borderRadius: "3rem",
          }}
          onClick={handlePost}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}

export default MyPostWidget;
