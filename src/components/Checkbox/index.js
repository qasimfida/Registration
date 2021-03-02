import React, { useEffect, useState } from 'react';
import check from '../../assets/icons/tick.svg'
import './styles.scss'

export default (props) => {
    const [checked, setChecked] = useState(false);
    useEffect(()=>{
        if(props.checked !== 'undefined'){
            setChecked(props.checked)
        }
    },[props.checked]);

    const handleChange = () => {
        props.onChange && props.onChange(checked) || setChecked(!checked)
    }
    return <div className={` custom-checkbox ${checked ? 'checked' : ''} ${props.rounded && 'rounded'} ${props.size || 'md'}`}  onClick={handleChange} >
        <div className="checkbox-icon" >{checked && <img src={check} slt="check icon"/>}</div>
        {
            props.label || props.children &&
        <div className="checkbox-label" >{props.label || props.children}</div>
        }
    </div>
}


