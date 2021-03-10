import { ButtonBase, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Selector from '../Selector';
import img1 from '../../assets/icons/reception.svg';
import img2 from '../../assets/icons/booking-engine.svg';
import img3 from '../../assets/icons/Page-1.svg';
import img4 from '../../assets/icons/Subtraction 4.svg';
import img5 from '../../assets/icons/POS.svg';
import img6 from '../../assets/icons/marketing-tools.svg';
import { IService, IStep3 } from '../../utils/types/stepperTypes'
import http from '../../utils/api';



const Index = (props: IStep3) => {
    const [services, setServices] = useState<IService[]>([])


    useEffect(() => {
        getProperties();
    }, [])

    const getProperties = async () => {
        let token: any = localStorage.getItem('token')
        let res: any = await http.get('/hotel/getservices', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res && res.data) {
            setServices(res.data)
        }
    }
    const onChange = (key: IService) => (event: any) => {
        props.handleChange(key)
    }
    const { data } = props;
    console.log(data);
    return <div>
        <Grid container spacing={4} >
            {
                services.map(item => {
                    return (
                        <Grid item xs={4} >
                            <Selector img={item.image} checked={Boolean(data.filter(i => i.id === item.id).length)} onChange={onChange(item)} title={item.name} text={item.description} />
                        </Grid>
                    )
                })
            }
            <Grid item xs={12} >
                <ButtonBase className="form-btn" onClick={props.handleSubmit} >FINISH YOUR ACCOUNT SETTUP</ButtonBase>

            </Grid>
        </Grid>
    </div>
}

export default React.memo(Index);