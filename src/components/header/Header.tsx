import { useState } from "react";
import { Link } from "react-router-dom";
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

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prevValue) => !prevValue);
  };

  const DrawerList = (
    <Box role="presentation" onClick={toggleDrawer}>
      <List>
        <ListItem key={"companies"} disablePadding>
          <Link to="/">
            <ListItemButton>
              <ListItemIcon>
                <StoreIcon />
              </ListItemIcon>
              <ListItemText primary={"Companies"} />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <nav className="app-header">
        <HeaderWrapper>
          <Constraint>
            <div className="app-menu-button">
              <Button onClick={toggleDrawer}>
                <MenuIcon /> MENU
              </Button>
            </div>
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
