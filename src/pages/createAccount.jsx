import React, { useState } from 'react';
import {
  FiUser,
  FiLock,
  FiUserPlus,
} from 'react-icons/fi';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { register } from 'js-wowemu-auth';

import axios from 'axios';

import {
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import MarkdownPage from '../containers/MarkdownPage';

export default function CreateAccountPage() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });

  const [token, setToken] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [alertCaptcha, setAlertCaptcha] = useState(false);
  const [alertRequiredInputs, setalertRequiredInputs] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateCaptcha = () => {
    if (token === userCaptcha) {
      return true;
    }

    return false;
  };

  const renderAlert = (type, message) => (
    <Alert className="alert-form" variant={type}>
      {message}
    </Alert>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userData;

    const data = register(username, password);

    if (!validateCaptcha()) {
      setAlertCaptcha(true);
    } else if ((username === '' || password === '') && validateCaptcha()) {
      setalertRequiredInputs(true);
      setAlertCaptcha(false);
    } else {
      setalertRequiredInputs(false);
      setAlertCaptcha(false);
      axios.post('/api/account/create', {
        username,
        s: data.salt,
        v: data.verifier,
      })
        .then((response) => {
          setUserData({
            username: '',
            password: '',
          });
          setUserCaptcha('');
        })
        .catch((error) => {
        });
    }
  };

  return (
    <MarkdownPage title="Create Account">

      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>
            <FiUser className="me-2" />
            Account Name
          </Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="username"
            value={userData.username}
            autoComplete="off"
            type="text"
          />

        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>
            <FiLock className="me-2" />
            Account Password
          </Form.Label>
          <Form.Control
            onChange={handleInputChange}
            value={userData.password}
            name="password"
            type="password"
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="captcha">
          <Row>
            <Col lg={2} xs={3}>
              <div className="captcha">
                <GoogleReCaptcha
                  onVerify={(tok) => {
                    setToken(tok);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" />

        {alertCaptcha && renderAlert('danger', 'Invalid Captcha')}
        {alertRequiredInputs && renderAlert('danger', 'All inputs are required!')}

        <Button className="create-button" onClick={handleSubmit} type="submit">
          <FiUserPlus className="me-2" />
          Create Account
        </Button>

      </Form>

    </MarkdownPage>
  );
}
