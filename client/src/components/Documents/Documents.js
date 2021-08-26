import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Document from './Document/Document';
import useStyles from './styles';

const Documents = ({ setCurrentId }) => {
  const documents = useSelector((state) => state.posts);
  const classes = useStyles();

  return (
    !documents.length ? <CircularProgress /> : (
      <div style={{marginLeft: 10}}>
      <div style={{color: "white", marginBottom: 20, fontSize: 20, fontFamily: "Courier New"}}>Your files: </div>
      <Grid className={classes.container} class="allFiles" direction="column" container alignItems="flex-start" spacing={3}>
        {documents.map((post) => (
          <Grid  key={post._id} item xs={12} sm={12} md={12}>
            <Document document={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
      </div>
    )
  );
};

export default Documents;
