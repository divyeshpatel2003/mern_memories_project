import React from 'react'
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post'
import useStyles from './styles'
import { useSelector } from 'react-redux';

export default function Posts({set_current_id}) {
  const classes = useStyles();
  const posts = useSelector((state)=> state.posts)

  return (
    !posts.length ? <CircularProgress/> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} set_current_id={set_current_id} />
          </Grid>
        ))}
      </Grid>
    )
  )
}
