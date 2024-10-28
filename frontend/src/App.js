import React, { useEffect, useState } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts';
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import {get_posts} from './actions/posts'

import imagePhoto from './components/images/memories_logo.png'

const App = () =>{
    const [current_id, set_current_id] = useState(0)
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(get_posts());
    }, [dispatch, current_id])

    return(
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position='static' color='inherit'>
                <Typography className={classes.heading} variant='h2' align='center'>Memories </Typography>
                <img className={classes.image} src={imagePhoto} alt="memories" width='60' />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid items xs={12} sm={7}>
                            <Posts set_current_id = {set_current_id}/>
                        </Grid>
                        <Grid items xs={12} sm={4}>
                            <Form current_id={current_id}  set_current_id = {set_current_id} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

    )
}


export default App