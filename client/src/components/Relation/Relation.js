import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { Row } from 'reactstrap';
import useStyles from './styles';
import axios from 'axios';
import RelationsTable from '../RelationsTable/RelationsTable.js'

import { correctSelection, selectionPosition, selectionString } from '../../marking.js'

const Relation = () => {
  let word1 = '';
  let word2 = '';
  let word1Position = [-1, -1];
  let word2Position = [-1, -1];

  const classes = useStyles();

  function clear() {
    document.getElementById('printFirst').value = "";
    document.getElementById('printSecond').value = "";
    document.getElementById('power').value = "";

  }


  //print first word from relation
  function output1() {
    correctSelection();
    word1 = selectionString();
    word1Position = selectionPosition();
    document.getElementById("printFirst").value = word1;
  }
  

  //print second word from relation
  function output2() {
    correctSelection();
    word2 = selectionString();
    word2Position = selectionPosition();
    document.getElementById("printSecond").value = word2;
  }



  function add() {
    localStorage.setItem('user', 'user');
    const relation = {
        document_Id: localStorage.getItem('currentPostId'),
        relation_name: document.getElementById("name").value,
        relation_power: document.getElementById("power").value,
        word1: word1,
        word2: word2,
        word1_position: word1Position,
        word2_position: word2Position,
        user: localStorage.getItem('user'),
    }
    axios.post('http://localhost:27017/relations', relation).then(console.log('Dodano do bazy: ')).then(console.log(relation));
    // document.getElementById("relTab").forceUpdate();
  }


  return (
    <Paper className={classes.paper} style={{height: 300}}>
      <Typography variant="h6" align="center" >Add relation</Typography>
      <Row>
        <Button variant="contained" size="small" style={{ margin: 10 }} onClick={output1} >Word 1</Button>
        <input id="printFirst" readonly="true" type="text"></input>
      </Row>
      <Row>
        <Button variant="contained" size="small" style={{ margin: 10 }} onClick={output2} >Word 2</Button>
        <input id="printSecond" readonly="true" type="text"></input>
      </Row>
      <Row>
        <h style={{ margin: 10 }} >Relation power</h>
        <input id="power" type="text"></input>
      </Row>
      <br></br>
      <Row>
        <h style={{ margin: 10 }} >Relation name </h>
        <input id="name" type="text"></input>
      </Row>
      <br></br>
      <Button style={{backgroundColor: "#242424", color: "white", marginTop: 10}} variant="contained" size="small" onClick={add} fullWidth>Add relation</Button>
      <Button style={{backgroundColor: "#242424", color: "white", marginTop: 10}} variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
    </Paper> 
  );
};

export default Relation;
