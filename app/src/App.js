import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ClientComponent from './components/ClientComponent';
import LoginComponent from './components/LoginComponent';
import useToken from './hooks/useToken';
import AddClientComponent from './components/AddClientComponent';
import history from './history';
import Clientdata from './components/Clientdata';

function App() {
  
  const{token, userId, setToken} = useToken();

  if(!token) {
    return <LoginComponent setToken={setToken} />
  }

  return (
  <div className="bg-light">
    <div className="wrapper">
      <Router history={history}>
        <Routes>
            <Route exact path="/" element={<ClientComponent userId={userId}/>}/>
            <Route exact path="/editclient" element={<Clientdata/>} />
            <Route exact path="/addclient" element={<AddClientComponent/>}/>
        </Routes>
      </Router>
    </div>
  </div>
  );
}

export default App;
