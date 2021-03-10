import { ButtonBase, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ReactStars from "react-rating-stars-component";
import error from '../../assets/icons/error.svg'
import check from '../../assets/icons/tickgreen.svg'
import angledown from '../../assets/icons/angle-arrow-down.svg';
import http from '../../utils/api';

export default (props) => {
    const [passVisible, setPassvisible] = useState(false)

    const [countries, setCountries] = useState([]);
  
    useEffect(() => {
      fetchCountries()
    }, [])
  
    const fetchCountries = async () => {
      let res = await http.get('/hotel/getcountries');
      setCountries(res.data.countries)
    }
  
    const { errors, setErrors, onChange, data } = props;
    const validateSubmit = () => {
        let error = false;
        Object.keys(data).forEach(item => {
            if(!item || item === undefined){
                error = true
            }
        });
        return error
    }
    const validate = (key, value) => {
        let error = '';
        if (!value) {
            error = 'This field is required'
        }

        setErrors({ ...errors, [key]: error })
    }

    const handleChange = (key) => (event) => {
        if (event && event.target) {
            event.stopPropagation();
            event.preventDefault();
        }
        onChange && onChange(key, key === 'rate' ? event : event.target.value);
        setTimeout(() => {
            validate(key, key === 'rate' ? event : event.target.value)
        }, 300)
    }

    const handleSubmit = (event) => {
        event.stopPropagation();
        console.log(validateSubmit(), )
        if(!validateSubmit()){
            props.handleSubmit && props.handleSubmit();
        }
    };

    return <div className="property-details" onClick={(event) => { event && event.stopPropagation() }} >
        <div className="rate-label" >
            Put your Hotel rate (Optional)
        </div>
        <div className="rating"  >
            <ReactStars
                count={5}
                onChange={handleChange('rate')}
                size={24}
                isHalf={false}
                color="#E2E2E6"
                activeColor="#F1C04E"
            />
        </div>
        <div className="property-form" >
            <div className="input-form" >
                <TextField label="Hotel Name" onChange={handleChange('name')} value={data && data.name} error={Boolean(errors.name)}
                    helperText={errors.name}
                />
                {
                    Boolean(errors.name || data.name) &&
                    <span className="icon icon-after" ><img src={errors.name ? error : check} /></span>
                }
            </div>
            <div className="input-form" >
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Country</InputLabel>
                    <Select
                        IconComponent={(a, b) => {
                            return (
                                <img src={angledown} alt="andle down" />
                            )
                        }}
                        native
                        value={data && data.country}
                        onChange={handleChange('country')}
                        inputProps={{
                            name: 'Country',
                            id: 'age-native-simple',
                        }}
                    >
                        {countries.map((item)=>{
                            return <option key={item.id} value={item.prefix}>{item.country}</option>
                        })}
                    </Select>
                </FormControl>
            </div>
            <div className="input-form" >
                <TextField label="Address details" onChange={handleChange('address')} value={data && data.address} error={Boolean(errors.address)}
                    helperText={errors.address}
                />
                {
                    Boolean(errors.address || data.address) &&
                    <span className="icon icon-after" ><img src={errors.address ? error : check} /></span>
                }
            </div>
            <div className="d-flex grouped" >
                <div className="item" >
                    <div className="input-form" >
                        <TextField label="City" onChange={handleChange('city')} value={data && data.city} error={Boolean(errors.city)}
                            helperText={errors.city} />
                        {
                            Boolean(errors.city || data.city) &&
                            <span className="icon icon-after" ><img src={errors.city ? error : check} /></span>
                        }
                    </div>
                </div>
                <div className="item" >
                    <div className="input-form" >
                        <TextField label="Zip" onChange={handleChange('zip_code')} value={data && data.zip_code} error={Boolean(errors.zip_code)}
                            helperText={errors.zip_code} />
                        {
                            Boolean(errors.zip_code || data.zip_code) &&
                            <span className="icon icon-after" ><img src={errors.zip_code ? error : check} /></span>
                        }
                    </div>
                </div>
            </div>
            <ButtonBase className="form-btn mt-4 " onClick={handleSubmit} >add your property details</ButtonBase>
        </div>
    </div>
}