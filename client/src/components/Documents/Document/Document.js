import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';

import { deleteDocument } from '../../../actions/posts';
import useStyles from './styles';
import {OpenInNew} from "@material-ui/icons";

const Document = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      <CardContent>
          <Typography variant="h5" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deleteDocument(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        {/*TODO: Open file in a new tab*/}
        <Button size="small" color="primary" onClick={ ()=> window.open(post.selectedFile, "_blank") }><OpenInNew fontSize="small" /> Open</Button>
      </CardActions>
    </Card>
  );
};

export default Document;
