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
    },
    image: {
        maxWidth:'90%',
        height: 'auto',
    }
  }));
  
export default function ImageRender(props) {
    const classes = useStyles();
    const data = props.data;
    const deleteFunc = props.deleteFunc;

    let imageareaRender;
    imageareaRender =      <img className={classes.image}
                                src={data.imageUrl}
                            />

    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
            {imageareaRender}
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
