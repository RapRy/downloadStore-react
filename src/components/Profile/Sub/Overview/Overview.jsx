import React from "react";
import Moment from "react-moment";
import { Typography, Container, makeStyles, List } from "@material-ui/core";
import { useSelector } from "react-redux";
import {
  faUserEdit,
  faUserClock,
  faUserCog,
  faUserShield,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { MainHeading } from "../../../GlobalComponents/Typography";
import ListDetail from "./ListDetail";
import MenuButton from "./MenuButton";

const menus = [
  {
    text: "Edit Profile",
    icon: faUserEdit,
  },
  {
    text: "activity history",
    icon: faUserClock,
  },
  {
    text: "account security",
    icon: faUserShield,
  },
  {
    text: "account security",
    icon: faUserCog,
  },
];

const Overview = () => {
  const classes = useStyles();
  const { profile } = useSelector((state) => state.auth);
  return (
    profile && (
      <div>
        <MainHeading text="Account Overview" />
        <Container>
          <div className={classes.detailsContainer}>
            <List className={classes.list}>
              <ListDetail
                primary="Account Name:"
                secondary={`${profile?.user?.name?.firstName} ${profile?.user?.name?.lastName}`}
              />
              <ListDetail
                primary="mobile number:"
                secondary={`(+673) ${String(profile?.user?.mobile)}`}
              />
              <ListDetail
                primary="email address:"
                secondary={profile?.user?.email}
              />
              {profile?.user?.date?.lastSignIn && (
                <ListDetail
                  primary="recent activity"
                  secondary={
                    <Moment format="MMM Do YYYY">
                      {profile?.user?.date?.lastSignIn}
                    </Moment>
                  }
                />
              )}
              {profile?.user?.receiveUpdate?.sms && (
                <ListDetail
                  primary={null}
                  secondary="*Receiving updates via SMS"
                />
              )}
              {profile?.user?.receiveUpdate?.email && (
                <ListDetail
                  primary={null}
                  secondary="*Receiving updates via Email"
                />
              )}
            </List>
          </div>

          <div className={classes.menuContainer}>
            {menus.map((menu, i) => (
              <MenuButton
                key={i}
                index={i}
                text={menu.text}
                iconStart={menu.icon}
                iconEnd={faChevronRight}
              />
            ))}
          </div>
        </Container>
      </div>
    )
  );
};

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    background: theme.palette.neutrals.main,
    borderRadius: theme.shape.borderRadiusFive,
  },
  list: {
    padding: theme.spacing(2, 0),
  },
  menuContainer: {
    margin: theme.spacing(6, 0),
  },
}));

export default Overview;
