import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./User.css"


const User = ({ userId, username, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser" >
        <img src={avatar} alt={username} />
        <Typography style={{"font-size":"1.3rem"}}>{username}</Typography>
    </Link>
  );
};

export default User;
