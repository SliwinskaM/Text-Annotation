import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

import { markRelation, clearRelations } from "../../marking.js"

import { useDispatch } from 'react-redux';
import { getRelations } from '../../actions/relations';


class RelationsTable extends Component {

  state = {
    relations: [],
    selectedRow: -1
  }



  handleClick(row) {
    this.setState({ selectedRow: row._id });
    markRelation([row.word1_position, row.word2_position]);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
    .get("http://localhost:27017/relations/", 
    { params: {
      document_Id: localStorage.getItem('currentPostId')
    }})
    .then((response) => {
      this.setState({ relations: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteRelation(relationId) {
    // unmark relation if marked
    clearRelations();
    this.setState({ selectedRow: -1 });

    axios.delete('http://localhost:27017/relations/' + relationId).then(console.log('Usunięto: ')).then(console.log(relationId));
    this.getData();
  }

  render() {
    return (
      <TableContainer component={Paper} style={{maxHeight: 332}}>
        <Table aria-label="simple table" >
          <TableHead style={{backgroundColor: "#242424"}}>
            <TableRow >
              <TableCell style={{color: "white"}}>Name</TableCell>
              <TableCell align="right" style={{color: "white"}}>Power</TableCell>
              <TableCell align="right" style={{color: "white"}}>Word 1</TableCell>
              <TableCell align="right" style={{color: "white"}}>Word 2</TableCell>
              <TableCell align="right" style={{color: "white"}}>Reporter</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.relations.map((row) => (
              <TableRow key={row._id} style = {row._id === this.state.selectedRow ? {backgroundColor: "#b3ccff"} : null } >   
                <TableCell component="th" scope="row" onClick={() => this.handleClick(row)}>{row.relation_name} </TableCell>
                <TableCell align="right" onClick={() => this.handleClick(row)}>{row.relation_power}</TableCell>
                <TableCell align="right" onClick={() => this.handleClick(row)}>{row.word1}</TableCell>
                <TableCell align="right" onClick={() => this.handleClick(row)}>{row.word2}</TableCell>
                <TableCell align="right" onClick={() => this.handleClick(row)}>{row.user}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => this.deleteRelation(row._id)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
}

export default RelationsTable;