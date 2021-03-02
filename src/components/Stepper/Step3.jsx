import { Grid } from '@material-ui/core';
import React from 'react';
import Selector from '../Selector';
import img1 from '../../assets/icons/reception.svg'

export default (props) => {
    return <div>
        <Grid container  spacing={3} >
            <Grid item xs={4} >
                <Selector img={img1} title="Reception" text="Interactive booking calendar" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} title="Booking Engine" text="Reservation form for your website" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} title="Channel Manager" text="Booking.com, TripAdvisor..." />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} title="Housekeeping" text="Hotel Maintenance" />

            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} title="POS" text="Devices for Point of Sale" />
            </Grid>
            <Grid item xs={4} >
                <Selector img={img1} title="Marketing" text="Marketing tools to grow your sales" />
            </Grid>
        </Grid>
    </div>
}