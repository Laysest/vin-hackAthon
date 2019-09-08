import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BuildIcon from '@material-ui/icons/Build'

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    inputHeading: {
      width: '80%',
      fontSize: 24,
    },
    inputParagraph: {
        width: '80%',
        fontSize: 16
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
        justifyContent: 'flex-end',
    }
  }));
  
export default function InputRender(props) {
    const classes = useStyles();
    const data = props.data;
    const deleteFunc = props.deleteFunc;

    let TextareaRender;
    if (data.style == 'heading'){
        // TextareaRender =    <TextareaAutosize
        //                         aria-label="empty textarea"
        //                         rows={1}
        //                         defaultValue={data.defaultValue}
        //                         className={classes.inputHeading}
        //                     />
        TextareaRender = <div className={classes.inputHeading}>{data.defaultValue}</div>
    }
    else{
        // TextareaRender =    <TextareaAutosize
        //                         aria-label="empty textarea"
        //                         rows={4}
        //                         defaultValue={data.defaultValue}
        //                         className={classes.inputParagraph}
        //                     />
        TextareaRender = <div className={classes.inputParagraph}>{data.defaultValue}</div>
    }

    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            {TextareaRender}
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
