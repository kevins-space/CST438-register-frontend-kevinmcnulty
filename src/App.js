import './App.css';
import AppBar from '@mui/material/AppBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import AddStudentForm from './components/AddStudentForm';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
function App() {
  const handleAddStudent = (newStudent) => {

  };

  return (
    <div className="App">
      <Router>
        <AppBar position="static" color="default">
          <Toolbar>
             <Typography variant="h6" color="inherit">
              Course Registration
             </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/" component={Semester} />
          <Route path="/add-student" render={() => <AddStudentForm addStudent={handleAddStudent} />} />     
          <Route path="/schedule" component={SchedList} />
        </Switch>
      </Router>
	 <ToastContainer />
    </div>
  );
}

export default App;

