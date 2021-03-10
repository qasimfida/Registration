import React, { useEffect, useState } from 'react';
import check from '../../assets/icons/tick.svg'
import './styles.scss'
interface IProps {
    checked?: Boolean,
    onChange?: (props: Boolean)=>void,
    rounded?: Boolean,
    size?: string,
    label?: string,
    children?: any
}
export default (props:IProps ) => {
    const {checked, rounded, size, label, children} = props;
    const [active, setChecked] = useState<Boolean>(false);
    useEffect(()=>{
            setChecked(checked || false)
    },[checked]);

    const handleChange = (event: any) => {
        event.preventDefault();
        props.onChange && props.onChange(!active) || setChecked(!active)
    }
    return <div className={` custom-checkbox ${active ? 'checked' : ''} ${rounded && 'rounded'} ${size || 'md'}`}  onClick={handleChange}  >
        <div className="checkbox-icon" >{active && <img src={check} alt="check icon"/>}</div>
        {
            label || children &&
        <div className="checkbox-label" >{label || children}</div>
        }
    </div>
}


