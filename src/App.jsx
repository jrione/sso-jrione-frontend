import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';


const App = () => {
  return (
    <BrowserRouter>
          <Routes>
              <Route exact path="/" element={< Home />} />
              <Route path="/client/login/" element={<Login />} />
          </Routes>
    </BrowserRouter>
  )
}
export default App;