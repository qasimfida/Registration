import { ButtonBase, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React from 'react';
import ReactStars from "react-rating-stars-component";

export default (props) => {


    const handleChange = (key) => (event) => {
        props.onChange &&  props.onChange(key, key === 'rating' ? event : event.target.value)
    }

    const handleSubmit = (event) => {
        props.handleSubmit && props.handleSubmit();
    };

   const {data} = props;
    return <div className="property-details" >
        <div className="rate-label" >
            Put your Hotel rate (Optional)
        </div>
        <div className="rating" >
            <ReactStars
                count={5}
                onChange={handleChange('rating')}
                size={24}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
        </div>
        <div className="property-form" >
            <TextField label="Hotel Name" onChange={handleChange('name')} value={data && data.name } />
            <FormControl>
                <InputLabel htmlFor="age-native-simple">Country</InputLabel>
                <Select
                    native
                    value={data && data.country}
                    onChange={handleChange('country')}
                    inputProps={{
                        name: 'Country',
                        id: 'age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={'Pakistan'}>Pakistan</option>
                    <option value={'United State'}>United State</option>
                    <option value={'Russia'}>Russia</option>
                </Select>
            </FormControl>
            <TextField label="Address details" onChange={handleChange('address')} value={data && data.address}/>
            <div className="d-flex grouped" >
                <div className="item" >

                    <TextField label="City" onChange={handleChange('city')} value={data && data.city}/>
                </div>
                <div className="item" >
                    <TextField label="Zip" onChange={handleChange('zip')} value={data && data.zip}/>
                </div>

            </div>
            <ButtonBase className="form-btn mt-4 " onClick={handleSubmit} >add your property details</ButtonBase>
        </div>
    </div>
}