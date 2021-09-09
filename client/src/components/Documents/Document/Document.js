import React from 'react';
import {Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { BorderAllRounded, OpenInNew } from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteDocument } from '../../../actions/posts';
import useStyles from './styles';
import { grey, red } from '@material-ui/core/colors';

const Document = ({ document }) => {
  const [postData, setPostData] = useState({ message: '', selectedFile: '' });
  const dispatch = useDispatch();
  const classes = useStyles();
  var res = document.selectedFile.split(",");


  const changeTrigger = (e) => {
    localStorage.setItem('currentPostId', document._id);
    if (res[0].split('/')[1].split(';')[0] == "pdf") {

      localStorage.setItem('trigger', true);
      localStorage.setItem('type', res[0]);
      localStorage.setItem('text', window.atob(res[1]));

      console.log("pdf");

      window.location.reload();
    } else if (res[0].split('/')[1].split(';')[0] == "plain") {
      localStorage.setItem('trigger', true);
      localStorage.setItem('type', res[0]);
      localStorage.setItem('text', window.atob(res[1]));

      window.location.reload();
    }
  };

  return (
    <div>
    <div style={{ backgroundColor: "#ffffff", padding: 10, borderRadius: 5,}}>
    <div>
      <Typography variant="h5" component="p"  color="common.white" >{document.message}</Typography>
    </div>
  
    <div>
      <Button size="small" color="primary" onClick={() => dispatch(deleteDocument(document._id))}><DeleteIcon fontSize="small" /> Delete</Button>
      {/*TODO: Open file in a new tab*/}
      <Button size="small" color="primary" onClick={changeTrigger}><OpenInNew fontSize="small" /> Open</Button>
    </div>
    </div>
    <br></br>
    </div>
  );
};

export default Document;
