import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import "./CustomToast.css"

function CustomToast({btnProp,titleProp, contentProp, classNameBtnProp, classNameToastProp}) {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Row>
      <Col>
        <Button className={`toast-btn ${classNameBtnProp} btn-light p-0`} onClick={toggleShowA}>
          {btnProp}
        </Button>
        <Toast className={`toast-design ${classNameToastProp}`} show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <strong className="">{titleProp}</strong>
          </Toast.Header>
          <Toast.Body>{contentProp}</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default CustomToast;