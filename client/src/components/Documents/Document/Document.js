import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import {OpenInNew} from "@material-ui/icons";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteDocument } from '../../../actions/posts';
import useStyles from './styles';


const Document = ({ document }) => {
  const [postData, setPostData] = useState({ message: '', selectedFile: '' });
  const dispatch = useDispatch();
  const classes = useStyles();
  var res = document.selectedFile.split(",");


  const changeTrigger =  (e) => {
    if(res[0].split('/')[1].split(';')[0]=="pdf"){
      console.log("pdf");
    }else if(res[0].split('/')[1].split(';')[0]=="plain"){
      localStorage.setItem('trigger', true);
      localStorage.setItem('type',res[0]);
      localStorage.setItem('text', window.atob(res[1]));
      window.location.reload();
    }
  };

  return (

    <Card className={classes.card}>
      <CardMedia className={classes.media} image={document.selectedFile} />
      <CardContent>
          <Typography variant="h5" component="p">{document.message}</Typography>
      </CardContent>
     
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deleteDocument(document._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        {/*TODO: Open file in a new tab*/}
        <Button size="small" color="primary" onClick={changeTrigger}><OpenInNew fontSize="small" /> Open</Button>
       
      </CardActions>
    </Card>
  );
};

export default Document;
