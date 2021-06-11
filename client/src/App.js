import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Documents from './components/Documents/Documents';
import Form from './components/Form/Form';
import { getDocuments } from './actions/posts';
import { function1, function2, function3, function4, function5, function6, function7, label1_name, label2_name, label3_name, label4_name, label5_name, label6_name, label7_name } from './marking';

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
                  <Button className={label1_name} style={{ backgroundColor: "red", margin: 10 }} variant="contained" size="small" onClick={function1} >Label 1</Button>
                  <Button className={label2_name} style={{ backgroundColor: "orange", margin: 10 }} variant="contained" size="small" onClick={function2} >Label 2</Button>
                  <Button className={label3_name} style={{ backgroundColor: "yellow", margin: 10 }} variant="contained" size="small" onClick={function3} >Label 3</Button>
                  <Button className={label4_name} style={{ backgroundColor: "yellowgreen", margin: 10 }} color="#841584" variant="contained" size="small" onClick={function4} >Label 4</Button>
                  <Button className={label5_name} style={{ color: "white", backgroundColor: "green", margin: 10 }} variant="contained" size="small" onClick={function5} >Label 5</Button>
                  <Button className={label6_name} style={{ color: "white", backgroundColor: "blue", margin: 10 }} variant="contained" size="small" onClick={function6} >Label 6</Button>
                  <Button className={label7_name} style={{ backgroundColor: "lightblue", margin: 10 }} variant="contained" size="small" onClick={function7} >Label 7</Button>
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
