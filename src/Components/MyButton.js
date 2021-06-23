import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {useOvermind} from "../Others/OvermindHelper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        height: 50,
        width: 70,
        fontSize: 25

    },
    grid: {
        // backgroundColor: "#AAA",
    }
}));

const MyButton = (props) => {
    const classes = useStyles();
    return (
        <Grid className={classes.grid}>
            <input
                type="button"
                value={props.label}
                onClick={props.setDisplay}
                className={classes.root}
            />
        </Grid>
    );
};

export default MyButton;