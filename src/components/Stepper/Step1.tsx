import React, { useEffect, useState } from 'react';
import { TextField, ButtonBase} from '@material-ui/core';
import user from '../../assets/icons/full-name.svg'
import email from '../../assets/icons/email.svg'
import error from '../../assets/icons/error.svg'
import check from '../../assets/icons/tickgreen.svg'
import pass from '../../assets/icons/password.svg'
import conpass from '../../assets/icons/confirm-password.svg'
import mobile from '../../assets/icons/mobile.svg'
import visible from '../../assets/icons/visible.svg'
import hide from '../../assets/icons/hide.svg'
import Checkbox from '../Checkbox/index'
import { IStep1 } from '../../utils/types/stepperTypes'
import PhoneInput from '../PhoneInput/index'


const Index = (props: IStep1) => {
  const { data, errors, setErrors } = props;
  const [show, setShow] = useState<Boolean>(false);

  const handleSubmit = (event: any) => {
    props.handleSubmit && props.handleSubmit();
  };
  const validate = (key: string, value: string | any) => {
    let error = '';
    let pass = key === 'password' ? value !== props.data.confirm_password : props.data.confirm_password === value;
    if (key === 'email') {
      if (!value) {
        error = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
      }
    }
    if (key === 'password' || key === "confirm_password") {
      if (pass) {
        error = 'Password did not match';
      }
    }
    else {
      if (!value) {
        error = 'This field is required'
      }

    }
    let str = key === 'password' || key === 'confirm_password' ? 'password' : key;
    setErrors && setErrors({ ...errors, [str]: error })
  }

  const handleChange = (key: string) => (event: any) => {
    let value = event && event.target && event.target.value;
    props.handleChange && props.handleChange(key, key === 'termsofservice' || key === 'phone' ? event : value);

    setTimeout(() => {
      validate(key, value)
    }, 300);
  }

  return (
    <form autoComplete="off" className="stepper-form-1" onSubmit={handleSubmit} >
      <div className={`icon-input ${Boolean(!errors.fullname && data.fullname) ? 'valid-input' : ''} `} >
        <span className="icon icon-before" ><img src={user} /></span>
        <TextField
          id="name"
          name="name"
          value={data.fullname}
          onChange={handleChange('fullname')}
          error={Boolean(errors.fullname)}
          helperText={errors.fullname}
          label="Name & Surname" />
        {
          Boolean(errors.fullname || data.fullname) &&
          <span className="icon icon-after" ><img src={errors.fullname ? error : check} /></span>
        }
      </div>
      <div className={`icon-input ${Boolean(!errors.email && data.email) ? 'valid-input' : ''} `} >
        <span className="icon icon-before" ><img src={email} /></span>
        <TextField
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange('email')}
          error={Boolean(errors.email)}
          helperText={errors.email}
          label="Email" />
        {
          Boolean(errors.email || data.email) &&
          <span className="icon icon-after" ><img src={errors.email ? error : check} /></span>
        }
      </div>

      <div className="icon-input flag-input" >
        <span className="icon" ><img src={mobile} /></span>
        <div className="d-flex" >
          <PhoneInput value={data.phone} onChange={handleChange('phone')} />
        </div>
      </div>
      <div className={`icon-input ${Boolean(!errors.password && (data.password === data.confirm_password)) ? 'valid-input' : ''} `} >
        <span className="icon icon-before" ><img src={pass} /></span>
        <TextField type={show ? 'text' : "password"} error={Boolean(errors.password || data.password !== data.confirm_password)} label="Password" onChange={handleChange('password')} value={data && data.password} />
        <span className="icon icon-after" onClick={() => setShow(!show)} ><img src={show ? visible : hide} /></span>
      </div>
      <div className={`icon-input ${Boolean(!errors.password && (data.password === data.confirm_password)) ? 'valid-input' : ''} `} >
        <span className="icon icon-before" ><img src={conpass} /></span>
        <TextField type={show ? 'text' : "password"} error={Boolean(errors.password || data.password !== data.confirm_password)}
          helperText={errors.password} label="Confirm Password" onChange={handleChange('confirm_password')} value={data && data.confirm_password} />
        <span className="icon icon-after" onClick={() => setShow(!show)} ><img src={show ? visible : hide} /></span>
      </div>
      <div className="icon-input" >
        <Checkbox
          checked={data && data.termsofservice || false}
          onChange={handleChange('termsofservice')}
        ><p className="check-label" >I agree to the <a >Terms of Service</a></p></Checkbox>
      </div>
      <div className="icon-input" >
        <ButtonBase disabled={Boolean(errors.email && errors.fullname || data.fullname === '' || data.email === '' || !data.termsofservice)} className="form-btn" onClick={handleSubmit} >Register</ButtonBase>
      </div>
      <p className="already-account" >
        I have an account? <a>Sign In</a>
      </p>
    </form>);
}

export default React.memo(Index);

