import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import './styles.scss'

export default (props) => {
    const [checked,setChecked] = useState(false);
    useEffect(()=>{
        if(props.checked !== 'undefined'){
            setChecked(props.checked)
        }
    },[props.checked]);

    const onChange = (value) => {
        props.onChange && props.onChange(value) || setChecked(!checked);

    }

    return <div className={`checkbox-card-toggle ${props.className} ${checked ? 'active': ''} ${props.disabled ? 'disabled':''}`}  >
        <Card>
            <div className="card-img" >
                <img src={props.img} alt={props.img} />
            </div>
            <Card.Body>
                <Card.Title>{props.title || "Cart title"}</Card.Title>
                <Card.Text>
                {props.text || "Some quick example text to build on the card title and make up the bulk of the card's content."}
                </Card.Text>
            <Checkbox checked={checked} onChange={onChange} rounded />
            </Card.Body>
        </Card>
        <div className={`drawer`} >
            <div className="drawer-body">

            {props.children || "drawer"}
            </div>
        </div>
    </div>
}