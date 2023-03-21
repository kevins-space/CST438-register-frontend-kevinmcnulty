import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SERVER_URL } from '../constants.js';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, name: '', email: '' };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
}


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

 
  handleAdd = () => {
  const newStudent = {
    name: this.state.name,
    email: this.state.email,
    status: 0 
  };
  const token = Cookies.get('XSRF-TOKEN');

   fetch(`${SERVER_URL}student?name=${this.state.name}&email=${this.state.email}`,
      {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': token }
      })
    .then(response => {
      if (response.ok) {
        toast.success("Student added successfully", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.props.addStudent(newStudent);
        this.handleClose();
      } else {
        toast.error("Failed to add student", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error("Failed to add student", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    });
};
  render() {
    return (
	
	
      <div>
		<AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Add Student
               </Typography>
            </Toolbar>
         </AppBar>
        <Button variant="outlined" color="primary" style={{ margin: 10 }} onClick={this.handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add Student</DialogTitle>
          <DialogContent style={{ paddingTop: 20 }}>
            <TextField autoFocus fullWidth label="Name" name="name" onChange={this.handleNameChange} style={{ marginBottom: 12 }}/>
            <TextField fullWidth label="Email" name="email" onChange={this.handleEmailChange} />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button id="Add" color="primary" onClick={this.handleAdd}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
		
    );
  }
}

AddStudentForm.propTypes = {
  addStudent: PropTypes.func.isRequired
};

export default AddStudentForm;
