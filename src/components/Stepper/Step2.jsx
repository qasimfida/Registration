import React, { useState } from 'react';
import CheckboxCard from '../CheckboxCard';
import img1 from '../../assets/icons/hotel.svg';
import img2 from '../../assets/icons/hotel-group.svg';
import img4 from '../../assets/icons/path.svg';
import Features from './Features.jsx';

export default (props) => {
    const [active, setActive] = useState(null);
    const handleChange = (value) => event => {
        setActive(value === active ? null : value)
    }
    const {data} = props;
    return <div>
        <CheckboxCard title="HOTEL" img={img1} checked={active === 0} onChange={handleChange(0)} disabled={active !== null && active !== 0} className={`mb-4 `}>
            <Features handleSubmit={props.handleSubmit} onChange={props.handleChange} data={props.data}  />
        </CheckboxCard>
        <CheckboxCard title="APART-HOTEL" img={img2} checked={active === 1} onChange={handleChange(1)} disabled={active !== null && active !== 1} className={`mb-4`}>
            <Features handleSubmit={props.handleSubmit} onChange={props.handleChange} data={props.data}  />
        </CheckboxCard>
        <CheckboxCard title="HOTEL GROUP" img={img1} checked={active === 2} onChange={handleChange(2)} disabled={active !== null && active !== 2} className={`mb-4 `}>
            <Features handleSubmit={props.handleSubmit} onChange={props.handleChange} data={props.data}  />
        </CheckboxCard>
        <CheckboxCard title="MOTEL" img={img4} checked={active === 3} onChange={handleChange(3)} disabled={active !== null && active !== 3} className={`mb-4 `}>
            <Features handleSubmit={props.handleSubmit} onChange={props.handleChange} data={props.data}  />
        </CheckboxCard>
    </div>
}