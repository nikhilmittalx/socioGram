import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./User.css"


const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser" >
        <img src={avatar} alt={name} />
        <Typography style={{"font-size":"1.3rem"}}>{name}</Typography>
    </Link>
  );
};

export default User;
