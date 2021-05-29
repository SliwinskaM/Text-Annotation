import React, {useEffect, useState} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createDocument } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ message: '', selectedFile: '' });
  const document = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (document) setPostData(document);
  }, [document]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ message: '', selectedFile: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var res = postData.selectedFile.split(",");
    if(res[0].split('/')[1].split(';')[0]=="pdf"){
      console.log("pdf");
    }else if(res[0].split('/')[1].split(';')[0]=="plain"){
      if (currentId === 0) {
        dispatch(createDocument(postData));
        clear();
      }
    }else{
      alert("Wrong file type");
    }
  };

  let fileReader;
  
  const handleFileRead = (e) => {
    const content = fileReader.result;
    console.log(content);
  }

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  }
  


  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${document.title}"` : 'Add file and/or title'}</Typography>
        <TextField name="message" variant="outlined" label="Title" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <div className={classes.fileInput} onChange={ e=> handleFileChosen(e.target.files[0])}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
         /></div>
        <Button className={classes.buttonSubmit}  variant="contained" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
