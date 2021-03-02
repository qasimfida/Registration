import { ButtonBase, Grid } from '@material-ui/core';
import React from 'react';
import Selector from '../Selector';
import img1 from '../../assets/icons/reception.svg'

export default (props) => {
    const onChange = (key) => event => {
        props.handleChange(key, event)
    }
    const { data } = props;
    return <div>
        <Grid container spacing={4} >
            <Grid item xs={4} >
                <Selector img={img1} checked={data.reception} onChange={onChange('reception')} title="Reception" text="Interactive booking calendar" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} checked={data.booking} onChange={onChange('booking')} title="Booking Engine" text="Reservation form for your website" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} checked={data.channel} onChange={onChange('channel')} title="Channel Manager" text="Booking.com, TripAdvisor..." />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} checked={data.housekeeping} onChange={onChange('housekeeping')} title="Housekeeping" text="Hotel Maintenance" />

            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} checked={data.pos} onChange={onChange('pos')} title="POS" text="Devices for Point of Sale" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} checked={data.marketing} onChange={onChange('marketing')} title="Marketing" text="Marketing tools to grow your sales" />
            </Grid>
            <Grid item xs={12} >
                <ButtonBase className="form-btn" onClick={props.handleSubmit} >FINISH YOUR ACCOUNT SETTUP</ButtonBase>

            </Grid>
        </Grid>
    </div>
}