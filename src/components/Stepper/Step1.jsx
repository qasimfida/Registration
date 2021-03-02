import React, { useState } from 'react';
import { Card, Col, Container, Row, Form, InputGroup, Button } from 'react-bootstrap';
import {TextField, Grid, FormControlLabel, ButtonBase, withStyles} from '@material-ui/core';
import user from '../../assets/icons/full-name.svg'
import email from '../../assets/icons/email.svg'
import pass from '../../assets/icons/password.svg'
import conpass from '../../assets/icons/confirm-password.svg'
import mobile from '../../assets/icons/mobile.svg'
import Checkbox from '../Checkbox'


export default (props) => {

  const handleChange = (key) => (event) => {
    props.handleChange && props.handleChange(key, key === 'agree' ? event: event.target.value)
  }

  const handleSubmit = (event) => {
    props.handleSubmit && props.handleSubmit();
  };

  const {data} = props;

  return (
    <form noValidate autoComplete="off" className="stepper-form-1" >
      <div className="icon-input" >
          <span className="icon" ><img src={user} /></span>
        <TextField label="Name & Surname"  onChange={handleChange('name')} value={data && data.name} />
      </div>
      <div className="icon-input" >
          <span className="icon" ><img src={email} /></span>
        <TextField label="Email"  onChange={handleChange('email')} value={data && data.email} />
      </div>
      <div className="icon-input" >
          <span className="icon" ><img src={mobile} /></span>
        <TextField label="Phone No"  onChange={handleChange('phone')} value={data && data.phone} />
      </div>
      <div className="icon-input" >
          <span className="icon" ><img src={pass} /></span>
        <TextField type="password" label="Password"  onChange={handleChange('password')} value={data && data.password} />
      </div>
      <div className="icon-input" >
          <span className="icon" ><img src={conpass} /></span>
        <TextField type="password" label="Confirm Password"  onChange={handleChange('confirmPassword')} value={data && data.confirmPassword} />
      </div>
      <div className="icon-input" >
          <Checkbox
            checked={data && data.agree}
            name="checkedB" onChange={handleChange('agree')}
          ><p className="check-label" >I agree to the <a >Terms of Service</a></p></Checkbox>
      </div>
      <div className="icon-input" >
      <ButtonBase className="form-btn" onClick={handleSubmit} >Register</ButtonBase>
      </div>
      <p className="already-account" >
      I have an account? <a>Sign In</a>
      </p>
</form>);
}

