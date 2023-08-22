import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  HomeOutlined,
  PersonOutline,
} from "@mui/icons-material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useMatchMedia } from "../../../shared/hooks/useMatchMedia";
import styles from "./Header.module.scss";

const Header = () => {
  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { pathname } = useLocation();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const loggedIn = !!localStorage.getItem("auth");

  return (
    <>
      <AppBar color="success">
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.title}>
            Система учета воды
          </Typography>
          {(isTablet || isMobile) && (
            <MenuIcon
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            />
          )}
          {isDesktop && (
            <Box className={styles.box}>
              <Box className={styles.stack}>
                <div>
                  <Link to="/">Главная</Link>
                  {loggedIn && <Link to="/admin">Aдмин</Link>}
                  {!loggedIn && <Link to="/login">Войти</Link>}
                </div>
              </Box>
              {(pathname === "/admin" || pathname === "/") && (
                <>
                  {loggedIn && (
                    <ListItem
                      button
                      component={Link}
                      to="/"
                      onClick={() => {
                        localStorage.removeItem("auth");
                        handleDrawerClose();
                      }}
                    >
                      <PersonOutline color="success" sx={{ mr: 0.5 }} />
                      <Avatar sx={{ ml: 1 }} />
                      <ListItemText sx={{ ml: 1 }} primary="Выйти" />
                    </ListItem>
                  )}
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          style: {
            width: "50%",
          },
        }}
      >
        <List>
          <ListItem button>
            <ClearOutlinedIcon
              color="success"
              onClick={handleDrawerClose}
            />
          </ListItem>
          <Divider />
          <>
            <ListItem button component={Link} to="/">
              <HomeOutlined color="success" sx={{ mr: 1.5 }} />
              <ListItemText primary="Главная" />
            </ListItem>
            {loggedIn &&
              <ListItem button component={Link} to="/admin">
                <AdminPanelSettingsOutlined
                  color="success"
                  sx={{ mr: 1.5 }}
                />
                <ListItemText primary="Админ" />
              </ListItem>
            }
            <ListItem
              button
              component={Link}
              to="/"
              onClick={() => {
                localStorage.removeItem("auth");
                handleDrawerClose();
              }}
            >
              <PersonOutline color="success" sx={{ mr: 1.5 }} />
              {
                loggedIn
                  ?
                  <ListItemText primary="Выйти" />
                  :
                  <Link to='/login'>
                    <ListItemText primary='Войти' />
                  </Link>
              }
            </ListItem>
            <Divider />
          </>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
