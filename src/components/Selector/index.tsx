import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Checkbox from '../Checkbox';
import './styles.scss'

interface IProps {
    onChange: (props: Boolean)=> any,
    checked?: Boolean,
    className?: string,
    disabled?: Boolean,
    img?: string,
    title?: string,
    text?: string
}
export default (props :IProps) => {
    const {checked, className, disabled, onChange, title, text, img} = props;
    const [active,setActive] = useState<Boolean>(false);
    useEffect(()=>{
            setActive(checked || false)
    },[checked]);

    const handleChange = (event: any) => {
        onChange && onChange(!checked) || setActive(!checked);

    }

    return <div onClick={handleChange} className={`checkbox-card-selector ${className} ${checked ? 'active': ''} ${disabled ? 'disabled':''}`}  >
        <Card>
            <div className="card-img" >
                <img src={img} alt={img} />
            </div>
            <Card.Body>
                <Card.Title>{props.title || "Cart title"}</Card.Title>
                <Card.Text>
                {text || "Interactive booking calendar"}
                </Card.Text>
            <Checkbox checked={active} rounded />
            </Card.Body>
        </Card>
    </div>
}