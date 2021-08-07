import React, { useState, useCallback } from "react";
import { Container, Button, Box, makeStyles } from "@material-ui/core";

import { Comment } from "../GlobalComponents/Contents";

const CommentList = ({ comments }) => {
  const classes = useStyles();
  const perComments = 5;
  const [endInd, setEndInd] = useState(perComments);
  const [remaining, setRemaining] = useState(comments.length - 1 - perComments);

  const showMoreComments = useCallback(() => {
    if (remaining !== 0) {
      const updatedRemaining = comments.length - 1 - (endInd + perComments);
      const updatedInd =
        Math.sign(updatedRemaining) === -1
          ? comments.length - 1
          : endInd + perComments;
      setEndInd(updatedInd);
      setRemaining(Math.sign(updatedRemaining) === -1 ? 0 : updatedRemaining);
    }
  }, [endInd, remaining]);

  return (
    <Container>
      {comments.map((comment, i) => {
        if (i <= endInd - 1)
          return <Comment key={comment._id} comment={comment} />;
      })}
      {comments.length - 1 > perComments && (
        <Box textAlign="right">
          <Button
            classes={{ root: classes.button }}
            onClick={showMoreComments}
            disabled={remaining === 0 ? true : false}
          >{`more comments (${remaining})`}</Button>
        </Box>
      )}
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: ".75rem",
    textTransform: "lowercase",
  },
}));

export default CommentList;
