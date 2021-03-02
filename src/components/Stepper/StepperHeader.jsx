import React from 'react';
import { Card, Form } from 'react-bootstrap';
import logo from '../../assets/icons/logo.svg'

export default (props) => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    const { title, text, img, children, ...rest } = props;
    return <Card {...rest}>
        {children ||
            <>
                <Card.Img variant="left" src={logo} />
                <Card.Body>
                    <Card.Title>{title || "title"}</Card.Title>
                    <Card.Text>
                        {text || "description text here"}
                    </Card.Text>
                </Card.Body>
                <Form>
                    <Form.Control as="select" size="sm" >
                        <option>English</option>
                        <option>Spanish</option>
                    </Form.Control>

                </Form>
            </>
        }
    </Card>
}