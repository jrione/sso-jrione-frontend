import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie';

import "../assets/css/index.css";


function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
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
    const refresh = JSON.stringify({'access_token': Cookies.get('access_token')})
    await axios.post(process.env.VITE_SSO_URL+"auth/logout",refresh,{
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer '+ Cookies.get('access_token')
        }
    }).then((response) => {
          Cookies.remove('access_token', response.AccessToken);
          Cookies.remove('refresh_token', response.RefreshToken);
          window.location.href = "/";
    }).catch( (error) =>{
        console.log(error)  
    })

}

export default Navigation