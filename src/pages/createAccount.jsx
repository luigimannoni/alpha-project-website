import React, { useState, useEffect } from 'react';
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserPlus,
} from 'react-icons/fi';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { register } from 'js-wowemu-auth';

import fetch from 'isomorphic-fetch';

import {
  Form,
  Button,
  Row,
  Col,
  Alert,
} from 'react-bootstrap';
import MarkdownPage from '../containers/MarkdownPage';

const MESSAGES = {
  ACCOUNT_CREATED: 'Your account was successfully created. Please set your realmlist to `set realmlist logon1.thealphaproject.eu`! Have fun!',
  NAME_INVALID_SYMBOLS: 'Remove odd characters to continue!',
  NAME_INVALID_LENGTH: 'The given Username is too long! Please use a username with a maximum of 16 characters!',
};

export default function CreateAccountPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [token, setToken] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [alertRequiredInputs, setalertRequiredInputs] = useState(false);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    const verify = async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
      }

      const tok = await executeRecaptcha('register');
      setToken(tok);
    };

    verify();
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const renderAlert = (type, message) => (
    <Alert className="alert-form" variant={type}>
      {message}
    </Alert>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = userData;

    const data = register(username, password);

    if ((username === '' || password === '' || email === '')) {
      setalertRequiredInputs(true);
    } else {
      setalertRequiredInputs(false);
      fetch('/api/account/create', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          s: data.salt,
          v: data.verifier,
          token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserData({
            username: '',
            email: '',
            password: '',
          });
          setUserCaptcha('');
        })
        .catch((error) => {
          console.log(error);
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

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>
            <FiMail className="me-2" />
            Email address
          </Form.Label>
          <Form.Control
            onChange={handleInputChange}
            name="email"
            value={userData.email}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            autoComplete="off"
            type="email"
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
                {/* <button tyoe="button" onClick={handleVerify}>Verify recaptcha</button> */}
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" />

        {alertRequiredInputs && renderAlert('danger', 'All inputs are required!')}

        <Button className="create-button" onClick={handleSubmit} type="submit">
          <FiUserPlus className="me-2" />
          Create Account
        </Button>

      </Form>

    </MarkdownPage>
  );
}
