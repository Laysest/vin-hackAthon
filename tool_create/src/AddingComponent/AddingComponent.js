import React, {Component, useState, useEffect} from 'react'; 
import './AddingComponent.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";

import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DropBox from "./DropBox";
import axios from 'axios';
const URL = 'http://54.169.254.105:8100';

function randString(){
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  function randInt(){
    return Math.floor(Math.random() * 100000000);
  }
  

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    inputHeading: {
        width: '95%',
        fontSize: 24,
        margin: '2%'
    },
    inputParagraph: {
        width: '95%',
        fontSize: 16,
        margin: '2%'
    },  
    textField:{
        width: '95%',
        fontSize: 16,
        margin: '2%'
    },
    submitButton: {
        margin: theme.spacing(2),
    },
    lineContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});

class AddingComponent extends Component {
  constructor(props) 
  { 
      super(props);
      this.state = { type: 'text', textStyle: 'heading', text: 'Your text', numberOptions: 2, options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5', 'option 6', 'option 7', 'option 8', 'option 9', 'option 10'],
                    names: [randString(), randString(), '', '', '', '', '', '', '', ''], formsId : ['', '', '', '', '', '', '', '', '', ''], formsCode: ['', '', '', '', '', '', '', '', '', ''],
                    imageIsExist: false, imageUrl: ''
    };
      this.handleChangeDropdown = this.handleChangeDropdown.bind(this);
      this.handleChangeDropdownTextStyle = this.handleChangeDropdownTextStyle.bind(this);
      this.handleChangeText = this.handleChangeText.bind(this);
      this.handleChangeNumberOptions = this.handleChangeNumberOptions.bind(this);
      this.handleChangeOptions = this.handleChangeOptions.bind(this);
      this.handleImageUpload = this.handleImageUpload.bind(this);
      this.createNextPage = this.createNextPage.bind(this);
  }

  createNextPage(idx){
    var self = this;
    var form_code = randString();
    var form_id = randInt();

    let lastFormsCode = this.state.formsCode;
    lastFormsCode[idx] = form_code;
    this.setState({formsCode: lastFormsCode})
    let lastFormsId = this.state.formsId;
    lastFormsId[idx] = form_id;
    this.setState({formsId: lastFormsId})

    axios.post(`${URL}/create`, {formCode: form_code, formId: form_id})
      .then(res => {
        console.log(`create ${form_code}`)
        window.open(`${URL}:3001/?formCode=${form_code}`);
    })
    console.log(this.formsCode);
  }

  handleImageUpload(imageUrl){
      this.setState({imageIsExist: true, imageUrl: imageUrl})
  }

  handleChangeOptions(value, idx){
    let lastOptions = this.state.options;
    lastOptions[idx] = value;
    this.setState({options: lastOptions});
  }

  handleChangeDropdown(event) {
    this.setState({type: event.target.value})
  }
  handleChangeDropdownTextStyle(event) {
    this.setState({textStyle: event.target.value})
  }
  handleChangeText(event){
    this.setState({text: event.target.value})
  }
  handleChangeNumberOptions(event){
      let numOpt = parseInt(event.target.value);
      let names = [];
      for(var i = 0; i < numOpt; i++){
        names.push(randString())
      }
      this.setState({numberOptions: numOpt, names: names})
  }

  render(){  
    const { classes, submitFunction } = this.props;
    let CustomizeComponent;
    if (this.state.type == 'text' && this.state.textStyle == 'heading'){
        CustomizeComponent =    <div className={classes.root}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Text style</InputLabel>
                                        <Select
                                            native
                                            value={this.state.textStyle}
                                            onChange={this.handleChangeDropdownTextStyle}
                                        >
                                            <option value={"heading"}> Heading </option>
                                            <option value={'paragraph'}> Paragraph </option>
                                        </Select>
                                    </FormControl>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        rows={1}
                                        value={this.state.text}
                                        className={classes.inputHeading}
                                        onChange={this.handleChangeText}
                                    />
                                </div>
    }
    else if (this.state.type == 'text' && this.state.textStyle == 'paragraph'){
        CustomizeComponent =    <div className={classes.root}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Text style</InputLabel>
                                        <Select
                                            native
                                            value={this.state.textStyle}
                                            onChange={this.handleChangeDropdownTextStyle}
                                        >
                                            <option value={"heading"}> Heading </option>
                                            <option value={'paragraph'}> Paragraph </option>
                                        </Select>
                                    </FormControl>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        rows={4}
                                        className={classes.inputParagraph}
                                        value={this.state.text}
                                        onChange={this.handleChangeText}
                                    />
                                </div>
    }
    else if (this.state.type == 'input'){
        CustomizeComponent =          <TextField
                                            id="standard-name"
                                            label="Name of input component"
                                            className={classes.textField}
                                            value={this.state.text}
                                            onChange={this.handleChangeText}
                                            margin="normal"
                                        />
    }
    else if (this.state.type == 'checkbox'){
        let numbers = [...Array(this.state.numberOptions).keys()]
        const listItems = numbers.map((number, idx) =>{
                                        let optionLable = `Option ${number + 1}`
                                        return(<TextField
                                            id="standard-name"
                                            label={optionLable}
                                            className={classes.textField}
                                            value={this.state.options[idx]}
                                            onChange={(e)=>{this.handleChangeOptions(e.target.value, idx)}}
                                            margin="normal"
                                        />)
                                    }
        );
    
        CustomizeComponent =    <div className={classes.root}>
                                    <TextField
                                        id="standard-name"
                                        label="Name of checkbox component"
                                        className={classes.textField}
                                        value={this.state.text}
                                        onChange={this.handleChangeText}
                                        margin="normal"
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Number of options</InputLabel>
                                        <Select
                                            native
                                            value={this.state.numberOptions}
                                            onChange={this.handleChangeNumberOptions}
                                        >
                                            <option value={1}> 1 </option>
                                            <option value={2}> 2 </option>
                                            <option value={3}> 3 </option>
                                            <option value={4}> 4 </option>
                                            <option value={5}> 5 </option>
                                            <option value={6}> 6 </option>
                                            <option value={7}> 7 </option>
                                            <option value={8}> 8 </option>
                                            <option value={9}> 9 </option>
                                        </Select>
                                    </FormControl>
                                    {listItems}
                                </div>
    }
    else if (this.state.type == 'radio'){
        let numbers = [...Array(this.state.numberOptions).keys()]
        const listItems = numbers.map((number, idx) =>{
                                        let optionLable = `Option ${number + 1}`
                                        return(<TextField
                                            id="standard-name"
                                            label={optionLable}
                                            className={classes.textField}
                                            value={this.state.options[idx]}
                                            onChange={(e)=>{this.handleChangeOptions(e.target.value, idx)}}
                                            margin="normal"
                                        />)
                                    }
        );
    
        CustomizeComponent =    <div className={classes.root}>
                                    <TextField
                                        id="standard-name"
                                        label="Name of radio component"
                                        className={classes.textField}
                                        value={this.state.text}
                                        onChange={this.handleChangeText}
                                        margin="normal"
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Number of options</InputLabel>
                                        <Select
                                            native
                                            value={this.state.numberOptions}
                                            onChange={this.handleChangeNumberOptions}
                                        >
                                            <option value={1}> 1 </option>
                                            <option value={2}> 2 </option>
                                            <option value={3}> 3 </option>
                                            <option value={4}> 4 </option>
                                            <option value={5}> 5 </option>
                                            <option value={6}> 6 </option>
                                            <option value={7}> 7 </option>
                                            <option value={8}> 8 </option>
                                            <option value={9}> 9 </option>
                                        </Select>
                                    </FormControl>
                                    {listItems}
                                </div>
    }
    else if (this.state.type == 'image'){
        CustomizeComponent =    <div className={classes.root}>
                                    <DropBox uploadFuncion={this.handleImageUpload}/>
                                </div>
    }
    else if (this.state.type == 'radioCondition'){
        let numbers = [...Array(this.state.numberOptions).keys()]
        const listItems = numbers.map((number, idx) =>{
                                        let optionLable = `Option ${number + 1}`
                                        return(
                                            <div className={classes.lineContainer}>
                                                <TextField
                                                    id="standard-name"
                                                    label={optionLable}
                                                    className={classes.textField}
                                                    value={this.state.options[idx]}
                                                    onChange={(e)=>{this.handleChangeOptions(e.target.value, idx)}}
                                                    margin="normal"
                                                />
                                                <Button className={classes.button} onClick={()=>{this.createNextPage(idx)}}>Customize Next Page</Button>
                                            </div>)
                                    });

        CustomizeComponent =    <div className={classes.root}>
                                    <TextField
                                        id="standard-name"
                                        label="Name of radio component"
                                        className={classes.textField}
                                        value={this.state.text}
                                        onChange={this.handleChangeText}
                                        margin="normal"
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel>Number of options</InputLabel>
                                        <Select
                                            native
                                            value={this.state.numberOptions}
                                            onChange={this.handleChangeNumberOptions}
                                        >
                                            <option value={1}> 1 </option>
                                            <option value={2}> 2 </option>
                                            <option value={3}> 3 </option>
                                            <option value={4}> 4 </option>
                                            <option value={5}> 5 </option>
                                            <option value={6}> 6 </option>
                                            <option value={7}> 7 </option>
                                            <option value={8}> 8 </option>
                                            <option value={9}> 9 </option>
                                        </Select>
                                    </FormControl>
                                    {listItems}
                                </div>
    }
    return (
        <div className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select
                    native
                    value={this.state.type}
                    onChange={this.handleChangeDropdown}
                >
                <option value={"text"}> Text </option>
                <option value={'input'}> Input </option>
                <option value={'checkbox'}> Checkbox </option>
                <option value={'radio'}> Radio </option>
                <option value={'image'}> Image </option>
                <option value={'radioCondition'}> Radio for next page </option>
                </Select>
            </FormControl>
            {CustomizeComponent}
            <Button variant="contained" className={classes.submitButton} onClick={() => {submitFunction(this.state)}}>
                Submit
            </Button>

        </div>
    );
  }
}

export default withStyles(styles,  { withTheme: true })(AddingComponent);
