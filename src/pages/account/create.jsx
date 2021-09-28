/* eslint-disable react/no-danger */
import React, { useState, useEffect, useCallback } from 'react';
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
import MarkdownPage from '../../containers/MarkdownPage';

const MESSAGES = {
  ACCOUNT_CREATED: 'Your account was successfully created. Please set your realmlist to <em class="fw-bold">set realmlist logon1.thealphaproject.eu</em>! Have fun!',
  NAME_INVALID_SYMBOLS: 'Username contains invalid symbols, please use only letters and numbers (A-Z, 0-9)!',
  NAME_INVALID_LENGTH: 'The given Username is too long! Please use a username with a maximum of 16 characters!',
  ERR_OFFLINE: 'Server is unreacheable or you\'re offline.',
};

export default function CreateAccountPage() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [token, setToken] = useState('');
  const [alertBanner, setAlertBanner] = useState(false);
  const [alertRequiredInputs, setalertRequiredInputs] = useState(false);

  const regenerateCaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    const tok = await executeRecaptcha('register');
    setToken(tok);
  }, [executeRecaptcha]);

  // You can use useEffect to trigger the verification as soon as the component being loaded
  useEffect(() => {
    regenerateCaptcha();
    // Do whatever you want with the token
  }, [executeRecaptcha, regenerateCaptcha]);

  const handleInputChange = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const renderAlert = (type, message) => (
    <Alert className="alert-form" variant={type}>
      <span dangerouslySetInnerHTML={{ __html: message }} />
    </Alert>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email } = userData;

    const srp = register(username, password);

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
          s: srp.salt,
          v: srp.verifier,
          token,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setAlertBanner({
              type: 'danger',
              message: MESSAGES[data.error],
            });
          } else {
            setUserData({
              username: '',
              email: '',
              password: '',
            });

            setAlertBanner({
              type: 'success',
              message: MESSAGES[data.success],
            });
          }

          regenerateCaptcha();
        })
        .catch((err) => {
          setAlertBanner({
            type: 'danger',
            message: err.error ? MESSAGES[err.error] : MESSAGES.ERR_OFFLINE,
          });
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
            maxLength="16"
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

        <Form.Group>
          {alertBanner && renderAlert(alertBanner.type, alertBanner.message)}
          {alertRequiredInputs && renderAlert('danger', 'All inputs are required!')}

          <Button className="create-button" onClick={handleSubmit} type="submit">
            <FiUserPlus className="me-2" />
            Create Account
          </Button>
        </Form.Group>

      </Form>

    </MarkdownPage>
  );
}
