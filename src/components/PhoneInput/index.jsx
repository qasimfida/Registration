import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-input-2/lib/style.css' 

export default (props) => {
    const [value, setValue] = useState();
    useEffect(()=>{
        setValue(props.value || '')
    },[props.value])
    const handleChange = (value, country, e, formattedValue) => {
        props.onChange && props.onChange(value) ||setValue(value)
    }
    return <PhoneInput
        value={value}
        enableAreaCodeStretch
        autoFormat={true}
        onChange={(a,b,c,d)=>handleChange(a,b,c,d)}
    />
}