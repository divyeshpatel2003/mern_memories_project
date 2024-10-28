import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import {get_posts} from '../../actions/posts'

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

const Home = () => {
  const [current_id, set_current_id] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_posts());
  }, [dispatch, current_id]);



  return (
    <Grow in>
        <Container>
                <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid items xs={12} sm={7}>
                            <Posts set_current_id = {set_current_id}/>
                    </Grid>
                    <Grid items xs={12} sm={4}>
                            <Form current_id={current_id}  set_current_id = {set_current_id} />
                    </Grid>
                </Grid>
        </Container>
    </Grow>
  );
};

export default Home;
