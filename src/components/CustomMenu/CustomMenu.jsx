import React, { useState, useRef, useEffect } from "react";
import { IconButton, Avatar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import "./styles.css";

const CustomMenu = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onSelect(item);
    setIsOpen(false);
    if (item === "Logout") {
      dispatch(logOut());
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [options, onSelect]);

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      <IconButton onClick={handleClick}>
        <Avatar src="path" sx={{ cursor: "pointer" }} />{" "}
      </IconButton>
      {isOpen && (
        <div className="custom-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() => handleItemClick(option)}
            >
              <Typography sx={{ color: "#000" }}>{option}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMenu;
