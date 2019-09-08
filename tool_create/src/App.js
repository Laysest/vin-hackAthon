import React, {Component} from 'react'; 
import './App.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Input from '@material-ui/core/Input';
import { makeStyles, withStyles } from "@material-ui/core/styles";

import RadioRender from "./Component/RadioRender";
import CheckboxRender from "./Component/CheckboxRender";
import InputRender from "./Component/InputRender";
import TextRender from "./Component/TextRender";
import ImageRender from "./Component/ImageRender";
import AddingComponent from "./AddingComponent/AddingComponent";
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ImageUploader from 'react-images-upload';
import QrCode from 'qrcode-reader';

var QRCode = require('qrcode.react');
const queryString = require('query-string');




const FileDownload = require('js-file-download');
const URL = 'http://54.169.254.105:8100';

var fs = require('fs');
function randString(){
  return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function randInt(){
  return Math.floor(Math.random() * 100000000);
}

const styles = theme => ({
  contentContainer: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  bottomBarContainer:{
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  inputTitle: {
    margin: theme.spacing(1),
    width: '100%',
    fontSize: 30,
    marginBottom: theme.spacing(3)
  },
  paper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) !important',
    position: 'absolute',
    width: '50%',
    height: '50%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'auto'
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  }
});

const newFile = (formId) => {
  return {"data":{"link_form_ids":[],"form_id:":formId,"metadata":{"app_name":"Uni","app_id":123456,"title":"","submit_button":{"label":"Gửi thông tin","background_color":"#6666ff","cta":"request","url":`http://54.169.254.105/api/get_examples?form_id=${formId}`},"elements":[]}}}
}


function RenderElements(props){
  const elements = props.elements;
  const deleteFunc = props.deleteFunc;
  const listItem = elements.map((element, idx) => {
    if (element.type == 'text'){
      return <TextRender data={element} deleteFunc={() => {deleteFunc(idx)}}/>
    }
    else if (element.type == 'input'){
      return <InputRender data={element} deleteFunc={() => {deleteFunc(idx)}}/>
    }
    else if (element.type == 'checkbox'){
      return <CheckboxRender data={element} deleteFunc={() => {deleteFunc(idx)}}/>
    }
    else if (element.type == 'radio'){
      return <RadioRender data={element} deleteFunc={() => {deleteFunc(idx)}}/>
    }
    else if (element.type == 'image'){
      return <ImageRender data={element} deleteFunc={() => {deleteFunc(idx)}}/>
    }
    else if (element.type == 'radioCondition'){
      return <RadioRender data={element} deleteFunc={() => {deleteFunc(idx); this.setState({link_form_ids: []})}}/>
    }
  });
  return (
    <div>
      {listItem}
    </div>
  )
}

class App extends Component {
  constructor(props) 
  { 
      super(props); 
      // if (document.location.href != `${URL}:3001` && document.location.href != `${URL}:3001/`){
      //   let formCode =  
      // }
    
      this.state = { elements: [
        // {
        //   type: 'image',
        //   imageUrl: 'https://res.cloudinary.com/vtoan/image/upload/v1567864330/vhzaihgchbaasix3ugzi.png'
        // }
        // {
        //   type: 'radio',
        //   label: 'Gender',
        //   required: true,
        //   name: 'gender',
        //   options: [{
        //       value: 'female',
        //       label: 'Female'
        //   },
        //   {
        //     value: 'male',
        //     label: 'Male'
        //   },
        //   {
        //     value: 'other',
        //     label: 'Other'
        //   }]
        // },
        // {
        //   type: 'checkbox',
        //   label: 'Gender',
        //   required: true,
        //   name: 'gender',
        //   options: [{
        //       name: 'female',
        //       label: 'Female'
        //   },
        //   {
        //     name: 'male',
        //     label: 'Male'
        //   },
        //   {
        //     name: 'other',
        //     label: 'Other'
        //   }]
        // },
        // {
        //   type: 'input',
        //   label: 'Name',
        //   value: 'name',
        //   defaultValue: 'Your Name'
        // },
        // {
        //   type: 'text',
        //   style: 'heading',
        //   defaultValue: 'Your Name'
        // },
        // {
        //   type: 'text',
        //   style: 'paragraph',
        //   defaultValue: 'Your Name Your Name Your Name Your Name Your Name Your Name Your Name Your Name Your Name '
        // }
        ],
        modalIsOpen: false,
        modalImportIsOpen: false,
        title: '',
        form_id: randInt(),
        form_code: randString(),
        link_form_ids: [],
        pictures: [],
      }; 

      this.submitFunction = this.submitFunction.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.deleteFunc = this.deleteFunc.bind(this);
      this.generateFunc = this.generateFunc.bind(this);
      this.handleChangeValue = this.handleChangeValue.bind(this);
      this.importFileJson = this.importFileJson.bind(this);
      this.saveAndNext = this.saveAndNext.bind(this);
      this.handleCloseImport = this.handleCloseImport.bind(this);
      this.onDrop = this.onDrop.bind(this);

      var self = this;
      var regex = /[?&]([^=#]+)=([^&#]*)/g,
      url = window.location.href,
      params = {},
      match;
      while(match = regex.exec(url)) {
          params[match[1]] = match[2];
      }
      if (params != {}){
          axios.get(`${URL}/getFile/${params.formCode}`)
          .then(res => {
              let data = res.data.data;
              self.setState({form_id: data.form_id, form_code: params.formCode, link_form_ids: data.link_form_ids, title: data.metadata.title, elements: data.metadata.elements})
        })
      }
  }

  saveAndNext(){
    var self = this;
    var form_code = randString();
    var form_id = randInt();
    axios.post(`${URL}/create`, {formCode: form_code, formId: form_id})
      .then(res => {
        console.log(`create ${form_code}`)
    })
    this.generateFunc([form_id]);

    let new_form = newFile(form_id);
    this.setState({form_id: form_id, form_code: form_code, link_form_ids: [], elements: [], title: ''});
  }

  onDrop(picture) {
    // this.setState({
    //     pictures: this.state.pictures.concat(picture),
    // });
    // console.log(picture)
    var self = this;
    var reader = new FileReader();
    var qr = new QrCode();
    qr.callback = function(error, result) {
      if(error) {
        console.log(error)
        return;
      }
      // console.log(result.result)
      var s = result.result;
      s = s.substr(61, s.length - 72);
      self.importFileJson(s)
      self.setState({modalImportIsOpen: false})
    }
    reader.onload = function(event) {
      var contents = event.target.result;
      qr.decode(contents);
      // console.log("File contents: " + contents);
    };
    reader.readAsDataURL(picture[0]);
  }

  importFileJson(formCode){
    console.log(formCode)
    var self = this;
    axios.get(`${URL}/getFile/${formCode}`)
    .then(res => {
        let data = res.data.data;
        self.setState({form_id: randInt(), form_code: randString(), link_form_ids: data.link_form_ids, title: data.metadata.title});

        let elements = data.metadata.elements;
        let new_elements = elements.map(element => {
          if (element.type == 'text'){
            return {
              type: element.type,
              style: element.style,
              defaultValue: element.content
            }
          }
          else if (element.type == 'input'){
            return {
              type: element.type,
              label: element.label,
              name: element.name
            }
          }
          else if (element.type == 'radio'){
            return {
              type: element.type,
              name: element.name,
              label: element.label,
              options: element.options
            }
          }
          else if (element.type == 'checkbox'){
            return {
              type: element.type,
              name: element.name,
              label: element.label,
              options: element.options
            }
          }
          else if (element.type == 'web'){
            return {
              type: 'image',
              imageUrl: element.imageUrl
            }
          }
        })
        self.setState({elements: new_elements});  
    })
  }

  handleChangeValue(event){
    this.setState({title: event.target.value});
  }
  
  generateFunc(link_form_ids){
    var obj = {
      "data": {
        "link_form_ids": link_form_ids,
        "form_id:": this.state.form_id,
        "metadata":{
          "app_name":"Uni",
          "app_id":123456,
          "title": this.state.title,
          // "form_code": this.state.form_code,
          "submit_button": {
            "label": "Gửi thông tin",
            "background_color": "#6666ff",
            "cta": "request",
            "url": `http://54.169.254.105/api/get_examples?form_id=${this.state.form_id}`
          },
          "elements":[
          ]
        }
      }
    }

    for(var i = 0; i < this.state.elements.length; i++){
      let item = this.state.elements[i];
      if (item.type == 'text'){
        obj.data.metadata.elements.push({
          type: item.type,
          style: item.style,
          content: item.defaultValue
        })
      }
      else if (item.type == 'input'){
        obj.data.metadata.elements.push({
          type: item.type,
          input_type: 'textarea',
          label: item.label,
          name: randString()
        })
      }
      else if (item.type == 'radio'){
        obj.data.metadata.elements.push({
          type: item.type,
          display_type: 'inline',
          label: item.label,
          name: randString(),
          options: item.options
        })
      }
      else if (item.type == 'checkbox'){
        obj.data.metadata.elements.push({
          type: item.type,
          display_type: 'inline',
          label: item.label,
          name: randString(),
          options: item.options
        })
      }
      else if (item.type == 'image'){
        obj.data.metadata.elements.push({
          type: 'web',
          content: `<html><body><img src="${item.imageUrl}" alt="Trulli" width="350" height="333"><\/body><\/html>`,
          imageUrl: item.imageUrl
        })
      }
    }
    // console.log(obj);
    var self = this;
    axios.post(`${URL}/update`, {formCode: self.state.form_code, formJson: obj})
      .then(res => {
        console.log(`updated ${self.state.form_code}`)
    })
    axios.post(`${URL}/test_api`, {title: self.state.title, data: obj})
      .then(res => {
        // console.log(res);
        // console.log(res.data);

        axios.get(`${URL}/download`)
        .then((response) => {
            FileDownload(JSON.stringify(response.data), `${self.state.form_code}.json`);
        });
    })

    console.log(`QR: https://qr.id.vin/hook?url=http://54.169.254.105:8100/getFile/${self.state.form_code}&method=GET`)
  }

  deleteFunc(idx){
    let lastElements = this.state.elements;
    lastElements.splice(idx, 1);
    this.setState({elements: lastElements})
  }

  handleChange() {
  }
  handleClose(){
    this.setState({modalIsOpen: false})
  }
  handleCloseImport(){
    this.setState({modalImportIsOpen: false})
  }
  submitFunction(event){
    if (event.type == 'text'){
      let lastElements = this.state.elements;
      lastElements.push({
        type: event.type,
        style: event.textStyle,
        defaultValue: event.text
      })
      this.setState({elements: lastElements, modalIsOpen: false})
    }
    else if (event.type == 'input'){
      let lastElements = this.state.elements;
      lastElements.push({
        type: event.type,
        label: event.text
      })
      this.setState({elements: lastElements, modalIsOpen: false})
    }
    else if (event.type == 'checkbox'){
      let lastElements = this.state.elements;
      lastElements.push({
        type: event.type,
        label: event.text,
        required: true,
        name: event.text,
        options: event.options.slice(0, event.numberOptions).map(item => {
          return {
            name: randString(),
            label: item
          }
        })
      })
      this.setState({elements: lastElements, modalIsOpen: false})
    }
    else if (event.type == 'radio'){
      let lastElements = this.state.elements;
      lastElements.push({
        type: event.type,
        label: event.text,
        required: true,
        name: event.text,
        options: event.options.slice(0, event.numberOptions).map(item => {
          return {
            name: randString(),
            label: item
          }
        })
      })
      this.setState({elements: lastElements, modalIsOpen: false})
    }
    else if (event.type == 'image'){
      if (event.imageIsExist == true){
        let lastElements = this.state.elements;
        lastElements.push({
          type: event.type,
          imageUrl: event.imageUrl
        })
        this.setState({elements: lastElements, modalIsOpen: false})
      }
    }
    else if (event.type == 'radioCondition'){
      let lastElements = this.state.elements;
      let options = [];
      let links = [];
      for (var i = 0; i < event.numberOptions; i++){
        options.push({
          name: event.names[i],
          label: event.options[i]
        })
        links.push(`${event.formsId[i]}:${event.names[i]}`)
      }
      lastElements.push({
        type: event.type,
        label: event.text,
        required: true,
        name: event.text,
        options: options
      })

      console.log(links)

      this.setState({elements: lastElements, modalIsOpen: false, link_form_ids: links})
    }
  }
  render(){
    const { classes } = this.props;

    return (
      <div className="App">
        <div className={classes.contentContainer}>
          <Input
            placeholder="Form Title"
            className={classes.inputTitle}
            inputProps={{
              'aria-label': 'description',
            }}
            value={this.state.title}
            onChange={this.handleChangeValue}
          />
          <RenderElements elements={this.state.elements} deleteFunc={this.deleteFunc}/>
        </div>

        <div className={classes.bottomBarContainer}>
          <Button variant="contained" size="medium" className={classes.button} onClick={()=>{this.setState({modalIsOpen: true})}}>
            <AddIcon />
            Add
          </Button>

          <Button variant="contained" size="medium" className={classes.button} onClick={() => {this.setState({modalImportIsOpen: true})}}>
            <EditIcon />
            Import
          </Button>

          <Button variant="contained" size="medium" className={classes.button} onClick={this.saveAndNext}>
            <SendIcon />
            Next
          </Button>


          <Button variant="contained" size="medium" className={classes.button} onClick={(event) => {this.generateFunc(this.state.link_form_ids)}}>
            <SaveIcon />
            Save
          </Button>

        </div>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalIsOpen}
          onClose={this.handleClose}
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Customize Form</h2>
            <AddingComponent submitFunction={this.submitFunction}/>
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalImportIsOpen}
          onClose={this.handleCloseImport}
        >
          <div className={classes.paper}>
            <h2 id="simple-modal-title">Import QR</h2>
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles,  { withTheme: true })(App);
