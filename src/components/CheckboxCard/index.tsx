import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Checkbox from '../Checkbox/index';
import './styles.scss'

interface IProps {
    checked?: Boolean,
    onChange?: (props: Boolean) => void,
    className?: string,
    disabled?: Boolean
    img?: string
    text?: string
    children?: any
    title?: string


}

export default (props : IProps) => {
    const {checked, onChange, className, disabled, title, img, text, children} = props;
    const [active,setActive] = useState<Boolean>(false);
    useEffect(()=>{
            setActive(checked || false);
    },[checked]);

    const handleChange = (value : Boolean) => {
        onChange && onChange(value) || setActive(active);

    }
    const handleClick= () => {
        handleChange(!active)
    }

    return <div onClick={handleClick} className={`checkbox-card-toggle ${className} ${checked ? 'active': ''} ${disabled ? 'disabled':''}`}  >
        <Card>
            <div className="card-img" >
                <img src={img} alt={img} />
            </div>
            <Card.Body>
                <Card.Title>{title || "Cart title"}</Card.Title>
                <Card.Text>
                {text || "Some quick example text to build on the card title and make up the bulk of the card's content."}
                </Card.Text>
            <Checkbox checked={checked} onChange={handleClick}  rounded={true}/>
            </Card.Body>
        </Card>
        <div className={`drawer`} >
            <div className="drawer-body">
                {children || "drawer"}
            </div>
        </div>
    </div>
}