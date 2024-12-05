import { useState } from "react";
import { NavLink } from "react-router";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import StoreIcon from "@mui/icons-material/Store";
import { HeaderWrapper } from "./styledComponents";
import { Constraint } from "../shared/styledCommon";
import Flex from "../shared/styledFlex";
import { useAuth } from "../../context/auth/hooks/useAuth/useAuth";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useAuth() || {};

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
      <nav className="app-header">
        <HeaderWrapper>
          <Constraint>
            <Flex $justifyContent="space-between" $fullwidth>
              <div className="app-menu-button">
                <Button onClick={toggleDrawer}>
                  <MenuIcon /> MENU
                </Button>
              </div>

              <div className="app-logout-button">
                <Button onClick={logout}>Log out</Button>
              </div>
            </Flex>
          </Constraint>
        </HeaderWrapper>
      </nav>

      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default Header;
