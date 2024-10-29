import React,{useEffect, useState} from 'react'
import useStyles from './styles'
import {TextField, Button , Typography, Paper} from '@material-ui/core'
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { create_post, update_post } from '../../actions/posts';


export default function Form({current_id, set_current_id}) {
  const [post_data,set_post_data] = useState({ title: '', message: '',tags:'', selectedFile:''})
  const post = useSelector((state)=> (current_id ? state.posts.find((message)=> message._id === current_id) : null))
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=>{
    if (post) set_post_data(post)
  }, [post])


  const clear = ()=>{
    set_current_id(0)
      set_post_data({ title: '', message: '',tags:'', selectedFile:''})
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if (current_id === 0){
      dispatch(create_post({...post_data, name: user?.result?.name}))
      clear()
    }else{
      dispatch(update_post(current_id, {...post_data,name: user?.result?.name}))
      clear()
    }
  }

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography varient='h6'>{current_id ? `Editing "${post.title}"` : `Creating a Memory `}</Typography>
        <TextField name='title' variant='outlined' label='Title' fullWidth value={post_data.title} onChange={(e)=> set_post_data({...post_data, title: e.target.value})} ></TextField>
        <TextField name='message' variant='outlined' label='Message' fullWidth value={post_data.message} onChange={(e)=> set_post_data({...post_data, message: e.target.value})} ></TextField>
        <TextField name='tags' variant='outlined' label='Tags' fullWidth value={post_data.tags} onChange={(e)=> set_post_data({...post_data, tags:e.target.value.split(',')})} ></TextField>
        <div className={classes.fileInput}> <FileBase type='file' multiple={false} onDone={({base64}) => set_post_data({...post_data, selectedFile: base64})} /> </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth> Submit</Button>
        <Button style={{marginTop: "10px"}} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}
