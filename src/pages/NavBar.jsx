import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';

import "../assets/css/index.css";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [showModal, setShowModal] = useState({});
  useEffect( () =>{
    const access_token = Cookies.get('access_token')
    setIsAuth(!!access_token)
  }, [isAuth]);
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="container">
        <Nav.Item>
          <Navbar.Brand className="ml-10" href="/">JriOne</Navbar.Brand>
        </Nav.Item>
        {
          isAuth ? (
            <Nav.Item className="ml-auto">
              <Nav.Link onClick={LogoutPopup}>
                logout
              </Nav.Link>
            </Nav.Item>
          ): (
            <Nav.Item className="ml-auto">
              <Nav.Link href="/client/login">Login</Nav.Link>
            </Nav.Item>
          )
        }
      </Nav>
    </Navbar>
  );
}

const LogoutPopup = () =>{
  const LogoutSwal = withReactContent(Swal)
  LogoutSwal.fire({
    title: <p>Keluar</p>,
    text: "Apakah anda yakin?",
    icon: "warning",
    confirmButtonText: "Yakin",
  }).then((result) =>{
    result.isConfirmed 
        ? handleClickUserLogOut() 
        : console.log(result.isConfirmed)
  });
}

const LogoutInfo = (data) => {
    const LogoutInfoSwal = withReactContent(Swal)
    LogoutInfoSwal.fire({
        title: <p>INGPO</p>,
        text: data,
        icon: "info",
    })
}

const handleClickUserLogOut = async (e) => {
    Swal.showLoading()
    await axios.get(process.env.VITE_SSO_URL+"user",{
        headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer '+ Cookies.get('access_token')
        }
    }).then((response) => {
        console.log(response)
        LogoutInfo(response)
    }).catch( (error) =>{
        console.log(error)  
    })

    // Cookies.set('access_token', data.AccessToken);
    // Cookies.set('refresh_token', data.RefreshToken);
    // navigate("/");
}

export default Navigation