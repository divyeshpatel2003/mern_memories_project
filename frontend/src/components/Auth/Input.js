import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({name, handle_change, label, half, autoFocus, type, handle_show_password}) => {
  return (
    <Grid item xs={12} sm={half ? 6: 12} >
        <TextField 
            name={name}
            onChange={handle_change}
            variant='outlined'
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton onClick={handle_show_password}>
                                {type === 'password' ? <Visibility/>:<VisibilityOff/>}    
                            </IconButton>
                        </InputAdornment>
                    )
            }: null}    
        />
    </Grid>
  )
}

export default Input