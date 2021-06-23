import React, {useState, useEffect} from 'react';
import Grid from "@material-ui/core/Grid";
import {useOvermind} from "../Others/OvermindHelper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from '@material-ui/core/styles';
import MyButton from './MyButton'
import ThemeSelector from "./ThemeSelector"
import {Paper, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // backgroundColor: "#FFE0B2"
    },
    margin: {
        margin: theme.spacing(1),
    },
    output: {
        gridColumn: 1 / -1,
        backgroundColor: "#AAA",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        flexDirection: "column",
        padding: 10,
        wordWrap: "break-word",
        wordBreak: "break-all",
    },
    paper: {
        height: 520,
        width: 360,
        background: '#FFE0B2',
    },
    typography: {
        padding: 12,
        height: 98,
    },
    numpad: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }
}));

const label = ["AC", "*", "/", "C", 7 , 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "+", 0, "00", ".", "=" ]

const CounterDemo = () => {
    const {state, actions} = useOvermind()
    const [result, setResult] = useState(0);
    const [currentValue, setValue] = useState(0);
    const [ans, setAns] = useState('');
    const [qus, setQus] = useState('');
    const [message, setMessage] = useState("Initial");
    const classes = useStyles();
    
    const handleClick = (event)=>{

        const value = event.target.value;
        console.log(value)

        switch (value) {
            case '=': {

                // if it's an equal sign, use the eval module
                // to evaluate the question ,convert the answer
                // (in number) to String
                if (qus!=='')
                {
                    let tempAns='';
                    try
                    {
                        tempAns = eval(qus);
                        tempAns =  parseFloat(tempAns).toFixed(2)
                        console.log(tempAns)
                    }
                    catch(err)
                    {
                        setAns("Math Error")
                    }
                    if (tempAns===undefined)
                        setAns("Math Error")

                    // update answer in our state.
                    else {
                        setAns(tempAns);
                        setQus('');
                    }
                    break;
                }
            }
            case 'AC': {

                // if it's the Clears sign, just clean our
                // question and answer in the state
                setAns('');
                setQus('');
                break;
            }

            case 'C': {
                let str = qus;
                str = str.substr(0,str.length-1);
                setQus(str);
                break;
            }

            default: {

                // for every other command, update the answer in the state
                setQus(qus+value);
                break;
            }
        }
    }

    function handleKeyPress(event) {
        if(event.key === 'Enter'){
            console.log('enter press here! ')
        }
    }

    return (
        <Grid className={classes.root} xs={12} style={{padding: 48}} container direction='column' justify='center' alignItems='center'
              alignContent='center'>
            <Paper className={classes.paper} container direction='column' justify='center' alignItems='center' >
                <Typography className={classes.typography} variant="h5" gutterBottom>{qus}</Typography>
                <Typography className={classes.typography} variant="h2" gutterBottom>{ans}</Typography>
                <Grid className={classes.numpad} container item direction='row' alignItems='center' alignContent='center' justify='center'>
                    {
                        label.map((item, index)=>(
                            <MyButton xs={12} item onKeyPress={handleKeyPress} setDisplay={handleClick} value={item} label={item}/>
                        ))
                    }

                </Grid>
            </Paper>


        </Grid>
    );
};

export default CounterDemo;
