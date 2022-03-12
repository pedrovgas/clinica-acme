
import './App.css';
import {
  BrowserRouter as Router,
  useHistory,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from './components/Sidebar.jsx';
import LinkMenu from './components/LinkMenu.jsx';
import Edit from './containers/editPatients.jsx';
import Home from './containers/home'
import Register from './containers/registerPatients.jsx';
import { toast } from 'react-toastify';
import Patients from './containers/viewPatients'

function App() {
  function handleNoPatients() {
    alert('Não')
  }
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Sidebar>
          <Link to="/cadastrar-pacientes">
            <LinkMenu icon="add_circle" title="Adicionar Pacientes" />
          </Link>
          {localStorage.getItem('patients') ?
            <Link to="/consultar-pacientes">
              <LinkMenu icon="search" title="Consultar Pacientes" />
            </Link>
            :
            <Link to="#" onClick={function (e) {
              toast.warning('Não há pacientes cadastrados!', {
                theme: "light",
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}>
              <LinkMenu icon="search" title="Consultar Pacientes" />
            </Link>
          }
        </Sidebar>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/cadastrar-pacientes">
            <Register />
          </Route>
          <Route path="/consultar-pacientes">
            <Patients />
          </Route>
          <Route path="/editar-pacientes/:id">
            <Edit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
