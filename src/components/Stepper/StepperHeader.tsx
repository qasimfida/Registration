import React from "react";
import { Card, Form } from "react-bootstrap";
import logo from "../../assets/icons/logo.svg";
import { IHeader } from "../../utils/types/stepperTypes";

export default (props: IHeader) => {
  const { title, text, className } = props;
  return (
    <Card className={className || ""}>
      <div className="header-content" >
        <Card.Img src={logo} />
        <Card.Body>
          <Card.Title>{title || "title"}</Card.Title>
          <Card.Text>{text || "description text here"}</Card.Text>
        </Card.Body>
        <Form>
          <Form.Control as="select" size="sm">
            <option>English</option>
            <option>Spanish</option>
          </Form.Control>
        </Form>
      </div>
      <hr className="horizontal-divider" />
    </Card>
  );
};
