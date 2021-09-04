import React, { useState, useEffect } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiUserPlus } from 'react-icons/fi';
import ClientCaptcha from "react-client-captcha";
import { register } from 'js-wowemu-auth';

import axios from 'axios';

import {
  Form,
  Button,
  Row,
  Col,
  Alert
} from 'react-bootstrap';
import MarkdownPage from '../containers/MarkdownPage';

export default function CreateAccountPage() {

  const [userData, setUserData] = useState({
    username: '',
    password: ''
  });
  
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [alertCaptcha, setAlertCaptcha] = useState(false);
  const [alertRequiredInputs, setalertRequiredInputs] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name] : e.target.value.trim()
    });
  }

  const validateCaptcha = () => {
    if(captcha === userCaptcha){
      return true;
    }
    else{
      return false;
    }
  }

  const renderAlert = (type, message) => {
    return(
      <Alert className="alert-form" variant={type}>
        {message}
      </Alert>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    const {username, password} = userData;

    const data = register(username, password);

    console.log(userCaptcha);
    
    if(!validateCaptcha()){
      setAlertCaptcha(true);
    }
   
    else if(username === '' || password === '' && validateCaptcha()){
      setalertRequiredInputs(true);
      setAlertCaptcha(false);
    }
    else{
      
      setalertRequiredInputs(false);
      setAlertCaptcha(false);
      axios.post('http://localhost:3500/api/account/createAccount', {
        username: username,
        s: data.salt,
        v: data.verifier,
      })
      .then(function (response) {
        setUserData({
          username: '',
          password: ''
        });
        setUserCaptcha('');
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  }
 

  return (
    <MarkdownPage title="Create Account">

      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label><FiUser className="me-2"/>Account Name</Form.Label>
          <Form.Control 
            onChange={handleInputChange} 
            name="username" 
            value={userData.username} 
            autoComplete="off" 
            type="text"
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label><FiLock className="me-2"/>Account Password</Form.Label>
          <Form.Control 
            onChange={handleInputChange} 
            value={userData.password}
            name="password" 
            type="password" 
           />
        </Form.Group>
        <Form.Group  className="mb-1" controlId="captcha">
          <Row>
            <Col lg={3} xs={6}>
              <Form.Label>Enter Captcha</Form.Label>
              <Form.Control 
                className="captcha-input" 
                value={userCaptcha} 
                onChange={e => setUserCaptcha(e.target.value.trim())} 
                name="captcha" type="text" 
              /> 
            </Col>
            <Col lg={2} xs={3}>
              <div className="captcha">
                <ClientCaptcha captchaCode={code => setCaptcha(code)} />    
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          
        </Form.Group>

        {alertCaptcha && renderAlert('danger', 'Invalid Captcha')}
        {alertRequiredInputs && renderAlert('danger', 'All inputs are required!')}

        <Button className="create-button" onClick={handleSubmit} type="submit">
          <FiUserPlus className="me-2"/>Create Account
        </Button>

        
      </Form>
      

    </MarkdownPage>
  );
}
