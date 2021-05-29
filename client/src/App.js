import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Documents from './components/Documents/Documents';
import Form from './components/Form/Form';
import { getDocuments } from './actions/posts';
import Popup from './components/PopUp/popup';


const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocuments());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="flex-start" spacing={1}>
            <Grid item sm={3}>
              <Documents setCurrentId={setCurrentId} />
            </Grid>
            <Grid item sm={9}>
              <Grid item sm={12}>
                <Grid item xs={5} sm={5}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <br></br>
                  <button>label 1</button>
                  <button>label 2</button>
                  <button>label 3</button>
                  <button>label 4</button>
                </Grid>
              </Grid>
              <Popup trigger={localStorage.getItem('trigger')}></Popup>
              
            </Grid>
          </Grid>
        </Container>
      </Grow>
      
    </Container>
    
  );
};

export default App;
