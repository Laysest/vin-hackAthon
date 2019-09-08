import React from 'react';
import {fade, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import BuildIcon from '@material-ui/icons/Build'

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',
    },    
    card: {
        width: '100%',
        marginLeft: '2%',
        marginBottom: '2%',
    },
    cardContent: {
        width: '100%',
        textAlign: 'start'
    },
    cardAction: {
        width: '100%',
        justifyContent: 'flex-end'
    }  
})); 

const useStylesReddit = makeStyles(theme => ({
    root: {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: '#fcfcfb',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
    focused: {},
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '90%',
    },    
  }));
  

function RedditTextField(props) {
    const classes = useStylesReddit();
  
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  }
  

export default function InputRender(props) {
    const classes = useStyles();
    const data = props.data;
    const deleteFunc = props.deleteFunc;

    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            <RedditTextField
                label={data.label}
                className={classes.margin}
                defaultValue={data.defaultValue}
                variant="filled"
                id={data.name}
            />
            </CardContent>
            <CardActions className={classes.cardAction}>
                    <IconButton>
                        <BuildIcon />
                    </IconButton>
                    <IconButton onClick={deleteFunc}>
                        <DeleteIcon />
                    </IconButton>
            </CardActions>
        </Card>
    )
}
