import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Documents from './components/Documents/Documents';
import Form from './components/Form/Form';
import Relation from './components/Relation/Relation';
import EditableButton from './components/EditableButton/EditableButton';
import RelationsTable from './components/RelationsTable/RelationsTable'

import { getDocuments } from './actions/posts';
<<<<<<< HEAD
import { function1, function2, function3, function4, function5, function6, function7, label1_name, label2_name, label3_name, label4_name, label5_name, label6_name, label7_name } from './marking';
import { exportJSON } from './export';
=======
import { labelWords, labelsNames } from './marking';

>>>>>>> 639784b9c0780481c086d4e253d9aae3f65b9dba
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
              <Grid item> {/* xs={10} sm={5}> */}
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>
              <br></br>
              <br></br>
              <Documents setCurrentId={setCurrentId} />
            </Grid>
            <Grid item sm={9}>
              <Grid item sm={12}>
                <Grid container spacing={6}>
                  <Grid item xs={10} sm={5}>
                    <Relation />
                  </Grid>
                  <Grid item xs={10} sm={5}>
                    <RelationsTable />
                  </Grid>
                </Grid>
<<<<<<< HEAD
                <Grid item xs={12} sm={12}>
                  <br></br>
                  <Button className={label1_name} style={{ backgroundColor: "red", margin: 10 }} variant="contained" size="small" onClick={function1} >PERSON</Button>
                  <Button className={label2_name} style={{ backgroundColor: "orange", margin: 10 }} variant="contained" size="small" onClick={function2} >ORG</Button>
                  <Button className={label3_name} style={{ backgroundColor: "yellow", margin: 10 }} variant="contained" size="small" onClick={function3} >DATE</Button>
                  <Button className={label4_name} style={{ backgroundColor: "yellowgreen", margin: 10 }} color="#841584" variant="contained" size="small" onClick={function4} >LOCATION</Button>
                  <Button className={label5_name} style={{ color: "white", backgroundColor: "green", margin: 10 }} variant="contained" size="small" onClick={function5} >NORP</Button>
                  <Button className={label6_name} style={{ color: "white", backgroundColor: "blue", margin: 10 }} variant="contained" size="small" onClick={function6} >PRODUCT</Button>
                  <Button className={label7_name} style={{ backgroundColor: "lightblue", margin: 10 }} variant="contained" size="small" onClick={function7} >EVENT</Button>
                  <Button className="exportButton" style={{ backgroundColor: "gray", margin: 10 }} variant="contained" size="small" onClick={exportJSON} >EXPORT LABELS</Button>
=======
>>>>>>> 639784b9c0780481c086d4e253d9aae3f65b9dba
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
