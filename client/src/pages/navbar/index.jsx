import {
  useMediaQuery,
  Typography,
  InputBase,
  IconButton,
  Avatar,
  Box,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";

import FlexBetween from "components/FlexBetween";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout, setMode } from "state";

function Navbar() {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isNonMobileScreens = useMediaQuery("(min-width: 800px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  return (
    <FlexBetween padding="1rem 6%" bgcolor={theme.palette.navBar.main}>
      <FlexBetween gap="1.7rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: "#153f69",
            },
          }}
        >
          SociLink
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={theme.palette.searchBar.main}
            padding="0.1rem 1.1rem"
            borderRadius="0.7rem"
            gap="3rem"
          >
            <InputBase placeholder="Search..." />

            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Navbar */}
      {isNonMobileScreens ? (
        <FlexBetween gap="1.5rem" ml="0.5rem">
          {/* Dark Mode Button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? (
              <Brightness4Icon />
            ) : (
              <Brightness4Icon sx={{ color: "orange" }} />
            )}
          </IconButton>

          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <HelpIcon />
          </IconButton>

          <Box>
            <Avatar
              alt={fullName}
              onClick={handleAvatarClick}
              src={`http://localhost:3001/assets/${user.picturePath}`}
            />
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              onClose={handleAvatarClose}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={fullName} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => {
                      dispatch(setLogout());
                      navigate("/");
                    }}
                  >
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Popover>
          </Box>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Navbar */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          height="100%"
          bgcolor={theme.palette.navBar.main}
          right="0"
          bottom="0"
          zIndex="10"
        >
          <Box display="flex" flexDirection="column" p="1rem 3rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              sx={{ mb: "1.5rem" }}
            >
              <CloseIcon />
            </IconButton>

            <Box display="flex" flexDirection="column" gap="1rem">
              {/* Dark Mode Button */}
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness4Icon sx={{ color: "orange" }} />
                )}
              </IconButton>

              <IconButton>
                <MessageIcon />
              </IconButton>
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <IconButton>
                <HelpIcon />
              </IconButton>

              <Box>
                <Avatar alt={fullName} onClick={handleAvatarClick} />
                <Popover
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  onClose={handleAvatarClose}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary={fullName} />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton onClick={() => dispatch(setLogout())}>
                        <ListItemText primary="Logout" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Popover>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
