import React, {Component} from 'react'; 
import './SettingComponent.css';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

}));


export default class SettingComponent extends Component {
    constructor(props) 
    { 
        super(props); 
        this.state = { color : '#4cb96b' }; 
    } 
    render(){ 
        return(
            <div> </div>
    )}
}
