import React, { useEffect, useState } from 'react';
import CheckboxCard from '../CheckboxCard';
import img1 from '../../assets/icons/hotel.svg';
import img2 from '../../assets/icons/hotel-group.svg';
import img4 from '../../assets/icons/path.svg';
import Features from './Features';
import { IStep2 } from '../../utils/types/stepperTypes'
import http from '../../utils/api';

interface IProperty {
    id: number
    image: string
    name: string
}

const Index = (props: IStep2) => {
    const [active, setActive] = useState<Number | any>(null);
    const [propertyTypes, setPropertyTypes] = useState<IProperty[]>([]);

    useEffect(() => {
        getProperties();
    }, [])

    const getProperties = async () => {
        let token: any = localStorage.getItem('token')
        let res: any = await http.get('/hotel/getpropertytypes', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.data) {
            setPropertyTypes(res.data)
        }
    }
    const addProperty = async (property: any) => {
        let token: any = localStorage.getItem('token')
        let res: any = await http.post('/hotel/setpropertytype', { property }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    const handleChange = (value: string | number, event: any) => {
        props.handleChange(value, event)
    }
    const handleClick = (value: string | number) => (event: any) => {
        setActive(value === active ? null : value)
        addProperty(value)
    }
    return <div>
        {propertyTypes.map(item => {
            return (
                <CheckboxCard title={item.name} img={item.image} checked={active === item.id} onChange={handleClick(item.id)} disabled={active !== null && active !== item.id} className={`mb-4 `}>
                    <Features handleSubmit={props.handleSubmit} onChange={handleChange} data={props.data} errors={props.errors} setErrors={props.setErrors} />
                </CheckboxCard>
            )
        })}
        {/* <CheckboxCard title="APART-HOTEL" img={img2} checked={active === 1} onChange={handleClick(1)} disabled={active !== null && active !== 1} className={`mb-4`}>
            <Features handleSubmit={props.handleSubmit} onChange={handleChange(1)} data={props.data} errors={props.errors} setErrors={props.setErrors}  />
        </CheckboxCard>
        <CheckboxCard title="HOTEL GROUP" img={img1} checked={active === 2} onChange={handleClick(2)} disabled={active !== null && active !== 2} className={`mb-4 `}>
            <Features handleSubmit={props.handleSubmit} onChange={handleChange(2)} data={props.data} errors={props.errors} setErrors={props.setErrors}  />
        </CheckboxCard>
        <CheckboxCard title="MOTEL" img={img4} checked={active === 3} onChange={handleClick(3)} disabled={active !== null && active !== 3} className={`mb-4 `}>
            <Features handleSubmit={props.handleSubmit} onChange={handleChange(3)} data={props.data}  errors={props.errors} setErrors={props.setErrors} />
        </CheckboxCard> */}
    </div>
}
export default React.memo(Index);