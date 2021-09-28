import React, { useState, useEffect, useCallback } from 'react';
import {
  FiUser,
  FiLock,
  FiUserPlus,
} from 'react-icons/fi';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
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
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [userData, setUserData] = useState({
    username: '',
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
    const { username, password } = userData;

    const data = register(username, password);

    if ((username === '' || password === '')) {
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
