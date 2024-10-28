import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from './icons';
import Input from './Input';
import {sign_up, sign_in} from "../../actions/auth"
import { AUTH } from '../../constants/actionTypes';

const initial_state = {first_name: '', last_name: "", "email": "", password: "", confirm_password: ""};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [form, set_form] = useState(initial_state)
  const [is_signup, set_is_signup] = useState(false)
  const [show_password, set_show_password] = useState(false)

  const handle_show_password = () => set_show_password(!show_password)
  const switch_form = () =>{
    set_form(initial_state)
    set_show_password(false)
    set_is_signup(!is_signup)
  }

  const handle_submit = (e) =>{
    e.preventDefault();
    if(is_signup){
      dispatch(sign_up(form,navigate))
    }else{
      dispatch(sign_in(form, navigate))
    }
  }
  const google_success = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  const google_error = () => alert('Google Sign In was unsuccessful. Try again later');

  const handle_change = (e) => set_form({...form, [e.target.name] : e.target.value})
  return (
    <Container  component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">{is_signup ? "Sign up": "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handle_submit}>
        <Grid container spacing={2}>
          {is_signup && (
            <>
              <Input name="first_name" label="First Name" handle_change={handle_change} autoFocus half />
              <Input name="last_name" label="Last Name" handle_change={handle_change} autoFocus half />
            </>
          )}
            <Input type="email" name="email" label="Email Adress" handle_change={handle_change} autoFocus />
            <Input type={show_password ? "text": "password"} name="password" label="Password" handle_change={handle_change} handle_show_password={handle_show_password} />
            {is_signup && <Input name="confirm_password" label="Repeat Password" handle_change={handle_change}  type="password"/>}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {is_signup ? "Sign up" : "Sign in"}
        </Button>
          <GoogleLogin clientId='860177644167-gcjq63m4qnnlgf9uah4ov5km0le1jt1c.apps.googleusercontent.com' 
          render={(render_props)=>(
            <Button className={classes.googleButton} color="primary" fullWidth onClick={render_props.onClick} disabled={render_props.disabled} startIcon={<Icon />} variant="contained">
              Google Sign In
            </Button>
          )}
            onSuccess={google_success}
            onFailure={google_error}
            cookiePolicy='single_host_origin'
          />

          <Grid container justify="flex-end">
              <Grid item>
                  <Button onClick={switch_form}>
                    {is_signup ? "Already have an account? Sign in": "Don't have an account? Sign Up"}
                  </Button>
              </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth