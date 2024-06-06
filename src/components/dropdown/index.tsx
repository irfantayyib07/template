import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "@/app/globals.css";

type MenuItemProps = {
 label: string;
 onClick: () => void;
};

type DropDownProps = {
 buttonLabel: string;
 menuItems: MenuItemProps[];
};

const DropDown: React.FC<DropDownProps> = ({ buttonLabel, menuItems }) => {
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);

 const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
  setAnchorEl(null);
 };

 return (
  <div>
   <Button
    size="small"
    id="dynamic-button"
    aria-controls={open ? "dynamic-menu" : undefined}
    aria-haspopup="true"
    aria-expanded={open ? "true" : undefined}
    role="button"
    onClick={handleClick}
   >
    {/* {buttonLabel} */}
    <MoreVertIcon />
   </Button>

   <Menu
    id="dynamic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
     "aria-labelledby": "dynamic-button",
    }}
   >
    {menuItems.map((item, index) => (
     <MenuItem
      key={index}
      onClick={() => {
       item.onClick();
       handleClose();
      }}
      style={index === menuItems.length - 1 ? { color: "red" } : {}}
     >
      {item.label}
     </MenuItem>
    ))}
   </Menu>
  </div>
 );
};

export default DropDown;
