import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin  } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import Input from './Input';
import {sign_up, sign_in} from "../../actions/auth"
import { AUTH } from '../../constants/actionTypes';

const initial_state = {first_name: '', last_name: "", "email": "", password: "", confirm_password: "", custom: true};

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
    set_is_signup((pre_is_signup) => !pre_is_signup)
    set_show_password(false)
  }

  const handle_submit = (e) =>{
    e.preventDefault();
    if(is_signup){
      dispatch(sign_up(form,navigate))
    }else{
      dispatch(sign_in(form, navigate))
    }
  }
  const google_success = async (credential_response) => {
    form.custom = false;
    form.first_name = jwtDecode(credential_response.credential).name.split(' ')[0]
    form.last_name = jwtDecode(credential_response.credential).name.split(' ')[1]
    form.email = jwtDecode(credential_response.credential).email
    if(is_signup){
      dispatch(sign_up(form,navigate))
    }else{
      dispatch(sign_in(form, navigate))
    }
    // dispatch({type: AUTH, data: {result: jwtDecode(credential_response.credential), token: credential_response.credential}})
    // navigate('/')
  }

  const google_error = () => alert('Login Failed');

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
            <Input name="email" type="email" label="Email Adress" handle_change={handle_change} autoFocus />
            <Input name="password" type={show_password ? "text": "password"}  label="Password" handle_change={handle_change} handle_show_password={handle_show_password} />
            {is_signup && <Input name="confirm_password" label="Repeat Password" handle_change={handle_change}  type="password"/>}
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          {is_signup ? "Sign up" : "Sign in"}
        </Button>

        <GoogleLogin 
          onSuccess={google_success}
          onError={google_error}
          state_cookie_domain='single_host_origin'
          useOneTap
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