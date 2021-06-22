import React, { useEffect, useState } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import LineTo from 'react-lineto';

import useStyles from './styles';

const Relation = () => {
  const classes = useStyles();

  function clear() {
    document.getElementById('printFirst').value = "";
    document.getElementById('printSecond').value = "";
    document.getElementById('power').value = "";

  }

  //take selected text 

  function selectionString() {

    if (window.getSelection().toString()) {
      var sel = window.getSelection();
      var range = sel.getRangeAt(0);
      return sel.toString();
    } else {
      return ""
    }

  }

  //print first word from relation
  function output() {
    var selectedWord = selectionString();

    document.getElementById("printFirst").value = selectedWord;

  }
  //print second word from relation
  function output2() {
    var selectedWord = selectionString();

    document.getElementById("printSecond").value = selectedWord;

  }



  function add() {

  }


  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">Add relation</Typography>
      <Button variant="contained" size="small" style={{ margin: 10 }} onClick={output} >First word</Button>
      <input id="printFirst" readonly="true" type="text"></input>
      <Button variant="contained" size="small" style={{ margin: 10 }} onClick={output2} >Second word</Button>
      <input id="printSecond" readonly="true" type="text"></input>
      <h style={{ margin: 10 }} >Relation power</h><input id="power" type="text"></input>
      <Button variant="contained" size="small" style={{ marginTop: 10 }} onClick={add} fullWidth>Add relation</Button>
      <Button variant="contained" size="small" style={{ marginTop: 10 }} onClick={clear} fullWidth>Clear</Button>
    </Paper>
  );
};

export default Relation;
