import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { Row } from 'reactstrap';
import { useDispatch } from 'react-redux';

import Documents from './components/Documents/Documents';
import Form from './components/Form/Form';
import Relation from './components/Relation/Relation';
import EditableButton from './components/EditableButton/EditableButton';

import { getDocuments } from './actions/posts';
import { labelWords, labelsNames } from './marking';

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
                <Grid container spacing={6}>
                  <Grid item xs={10} sm={5}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <Relation />
                  </Grid>
                </Grid>
                </Grid>
                <Grid container justify="flex-start" alignItems="center" xs={12} spacing={1} style={{margin: 30}}>
                  <EditableButton xs={2} text={labelsNames[0]} labelId={0} className={labelsNames[0]} style={{ backgroundColor: "red", margin: 10 }} onClick={() => labelWords(labelsNames[0])}/>
                  <EditableButton xs={2} text={labelsNames[1]} labelId={1} className={labelsNames[1]} style={{ backgroundColor: "orange", margin: 10 }} onClick={() => labelWords(labelsNames[1])}/>
                  <EditableButton xs={2} text={labelsNames[2]} labelId={2} className={labelsNames[2]} style={{ backgroundColor: "yellow", margin: 10 }} onClick={() => labelWords(labelsNames[2])}/>
                  <EditableButton xs={2} text={labelsNames[3]} labelId={3} className={labelsNames[3]} style={{ backgroundColor: "yellowgreen", margin: 10 }} onClick={() => labelWords(labelsNames[3])}/>
                  <EditableButton xs={2} text={labelsNames[4]} labelId={4} className={labelsNames[4]} style={{ color: "white", backgroundColor: "green", margin: 10 }} onClick={() => labelWords(labelsNames[4])}/>
                  <EditableButton xs={2} text={labelsNames[5]} labelId={5} className={labelsNames[5]} style={{ color: "white", backgroundColor: "blue", margin: 10 }} onClick={() => labelWords(labelsNames[5])}/>
                  <EditableButton xs={2} text={labelsNames[6]} labelId={6} className={labelsNames[6]} style={{ backgroundColor: "lightblue", margin: 10 }} onClick={() => labelWords(labelsNames[6])}/>
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
