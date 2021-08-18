import React, { useRef } from "react";
import { Typography, makeStyles, Divider, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Glide from "react-glidejs";

import { Content } from "../../GlobalComponents/Contents";

const SubCategory = ({ subcat, setViewAll, viewAll }) => {
  const classes = useStyles();
  const { contents } = useSelector((state) => state.contents);
  const gliderRef = useRef(null);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.headerContainer}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={viewAll === "" ? 10 : 9}>
            <Typography variant="body1" className={classes.subName}>
              {subcat.subCatName}
            </Typography>
          </Grid>
          <Grid item xs={viewAll === "" ? 2 : 3}>
            <Typography
              variant="body1"
              className={classes.viewAll}
              onClick={() =>
                setViewAll((prevState) =>
                  prevState === "" ? subcat.subCatName : ""
                )
              }
            >
              {viewAll === "" ? "view all" : "minimize"}
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div>
      <div>
        {viewAll === "" ? (
          <Glide
            ref={gliderRef}
            type="slider"
            rewind={false}
            bound={true}
            perView={4}
            gap={20}
            breakpoints={{
              540: {
                perView: 3,
              },
            }}
          >
            {contents[subcat.subCatName].map((content) => (
              <Content key={content._id} content={content} size={100} />
            ))}
          </Glide>
        ) : (
          <Grid container direction="row" spacing={2}>
            {contents[subcat.subCatName].map((content) => (
              <Grid item xs={4} key={content._id}>
                <Content content={content} size={110} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(4),
    "&:first-child": {
      marginTop: theme.spacing(0),
    },
  },
  headerContainer: {
    marginBottom: theme.spacing(1),
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  subName: {
    color: theme.palette.neutrals.dark,
    fontSize: ".9rem",
    fontWeight: theme.typography.fontWeightMedium,
  },
  viewAll: {
    textAlign: "right",
    fontSize: ".8rem",
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.neutrals.dark,
    cursor: "pointer",
  },
}));

export default SubCategory;
