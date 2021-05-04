import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import {OpenInNew} from "@material-ui/icons";
import { useDispatch } from 'react-redux';

import { deleteDocument } from '../../../actions/posts';
import useStyles from './styles';

const Document = ({ document }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={document.selectedFile} />
      <CardContent>
          <Typography variant="h5" component="p">{document.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => dispatch(deleteDocument(document._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        {/*TODO: Open file in a new tab*/}
        <Button size="small" color="primary" onClick={ ()=> window.open(document.selectedFile, "_blank") }><OpenInNew fontSize="small" /> Open</Button>
      </CardActions>
    </Card>
  );
};

export default Document;
