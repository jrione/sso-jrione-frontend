import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Nav from './pages/NavBar';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
          <Nav />
          <Routes>
              <Route exact path="/" element={< Home />} />
              <Route path="/client/login/" element={<Login />} />
          </Routes>
      </Router >
  )
}
export default App;