import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

export default function ServerStatus({ name, realmlist }) {
  const [online, setOnline] = useState(false);

  // @TODO: Open an endpoint on Kalidar to query status
  // or players online rather than basing assumption on the realmlist
  // webserver responding and being alive
  useEffect(() => {
    if (realmlist) {
      fetch(realmlist)
        .then((res) => res.status)
        .then((status) => setOnline(status !== 0));
    }
  }, [realmlist]);

  return (
    <div>
      {name}
      {' '}
      {realmlist && (online ? <Badge pill bg="success">Online</Badge> : <Badge pill bg="danger">Offline</Badge>)}
      {!realmlist && <Badge pill bg="warning">PTR</Badge>}
    </div>
  );
}

ServerStatus.propTypes = {
  name: PropTypes.string.isRequired,
  realmlist: PropTypes.string,
};

ServerStatus.defaultProps = {
  realmlist: '',
};
