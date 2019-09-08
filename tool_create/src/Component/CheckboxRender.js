import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import BuildIcon from '@material-ui/icons/Build'
import DeleteIcon from '@material-ui/icons/Delete';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
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

function CheckboxItems(props) {
    const options = props.options;
    const listItems = options.map((option) =>
        <FormControlLabel 
            control={<Checkbox checked={false} onChange={()=>{}} value={option.value} />}
            label={option.label} 
        />
    );
    return (
        <FormGroup>
            {listItems}
        </FormGroup>
    );
}
  

export default function CheckboxRender(props) {
    const classes = useStyles();
    const data = props.data;
    const deleteFunc = props.deleteFunc;

    return(
        <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">{data.label}</FormLabel>
                    <CheckboxItems options={data.options}/>
                </FormControl>
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
