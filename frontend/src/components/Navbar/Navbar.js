import React, { useEffect, useState } from "react";
import {  AppBar, Typography, Toolbar, Avatar, Button} from "@material-ui/core";
import image_photo from '../images/memories_logo.png'
import useStyles from './styles';
import {Link, useNavigate, useLocation} from "react-router-dom"
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
    const [user,set_user] = useState(JSON.parse(localStorage.getItem('profile')))
    const classes = useStyles()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const logout = () =>{
        dispatch({type: LOGOUT})
        navigate('/auth')
        set_user(null)
    }

    useEffect(()=> {
      console.log(user?.result.picture)
      const token = user?.token
      if(token){
        const decoded_token = jwtDecode(token)
        if(decoded_token.exp * 1000 < new Date().getTime()) logout()
      }
      set_user(JSON.parse(localStorage.getItem('profile')))
    }, [location])
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
      <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">
        Memories
      </Typography>
      <img className={classes.image} src={image_photo} alt="memories" width="60" />
    </div>

    <Toolbar className={classes.toolbar}>
        { user?.result ? (
            <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}{user?.result.name.split(' ')[1].charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} onClick={logout} color="secondary">Logout</Button>
            </div>
        ): (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
    </Toolbar>
    </AppBar>
  );
};

export default Navbar;
