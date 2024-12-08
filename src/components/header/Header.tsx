import { useState } from "react";
import { NavLink } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import StoreIcon from "@mui/icons-material/Store";
import { styled } from "@mui/material/styles";
import { HeaderWrapper } from "./styledComponents";
import { Constraint } from "../shared/styledCommon";
import Flex from "../shared/styledFlex";
import { useAuth } from "../../context/auth/hooks/useAuth/useAuth";
import { NavButton } from "../shared/styledCommon";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";
import { IconBox } from "../shared/styledCommon";
import { getUserInitials } from "../../helpers/helpers";

const BootstrapDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderTopRightRadius: "48px",
    borderBottomRightRadius: "48px",
    padding: "20px 0",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { logout, authUser } = useAuth() || {};

  const userInitials = getUserInitials(authUser?.fullname || "");

  const toggleDrawer = () => {
    setDrawerOpen((prevValue) => !prevValue);
  };

  const DrawerList = (
    <Box role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem key={"companies"} disablePadding>
          <NavLink to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary={"Companies"} />
            </ListItemButton>
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <nav className="app-header" data-testid="app-header">
        <HeaderWrapper>
          <Constraint>
            <Flex
              $justifyContent="space-between"
              $alignItems="center"
              $fullwidth
            >
              <div className="app-menu-button">
                <NavButton onClick={toggleDrawer}>
                  <Flex $spacingSize="4px">
                    <MenuIcon />

                    <Typography
                      color="#ffffff"
                      style={{
                        fontSize: "17px",
                      }}
                    >
                      Menu
                    </Typography>
                  </Flex>
                </NavButton>
              </div>

              <Flex $alignItems="center" className="app-logo">
                <NavLink to={"/"}>
                  <Typography
                    color="#ffffff"
                    style={{ fontWeight: "800", fontSize: "26px", color: "" }}
                  >
                    LOGO
                  </Typography>
                </NavLink>
              </Flex>

              <Flex
                $spacingSize="8px"
                $alignItems="center"
                className="nav-auth-container"
              >
                {!!authUser && <IconBox>{userInitials}</IconBox>}

                <NavButton onClick={logout} data-testid="logout-button">
                  <LogoutIcon />
                </NavButton>
              </Flex>
            </Flex>
          </Constraint>
        </HeaderWrapper>
      </nav>

      <BootstrapDrawer open={drawerOpen} onClose={toggleDrawer}>
        {DrawerList}
      </BootstrapDrawer>
    </>
  );
};

export default Header;
