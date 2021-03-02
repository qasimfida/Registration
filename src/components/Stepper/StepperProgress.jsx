import React from 'react';
import { Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import img from '../../assets/icons/tickfill.svg';


export default (props) => {
    const { step, step1, step2, step3 } = props;
    return <Card className="stepper-progress" >
        <Card.Title>Setup Progress <span> <b>{4 - step}</b> STEPS LEFT  </span></Card.Title>
        <ProgressBar now={(step - 1) * 33.33} label={`${(step - 1) * 33.33}%`} />
        <Card.Subtitle>
            <div className="bullet" >1</div>
            <span>  Account Details</span>
            <div className="status">{step === 1 ? "in progress" : "complete"}</div>
        </Card.Subtitle>
        {step > 1 &&
            <Card.Text>
                <li> <span>Name & Surname</span> <span>{step1 && step1.name}</span></li>
                <li> <span>Email</span> <span>{step1 && step1.email}</span></li>
                <li> <span>Phone No</span> <span>{step1 && step1.phone}</span></li>
                <li> <span>Password</span> <span>********</span></li>
            </Card.Text>
        }
        {step > 2 &&
            <Card.Subtitle>
                <div className="bullet" >2</div>
                <span>  Account Details</span>
                <div className="status">{step <= 2 ? "in progress" : "complete"}</div>
            </Card.Subtitle>}{

            step > 2 &&
            <Card.Text>
                <li> <span>Hotel Stars </span> <span>{step2 && step2.rating}</span></li>
                <li> <span>Hotel Name</span> <span>{step2 && step2.name}</span></li>
                <li> <span>Country</span> <span>{step2 && step2.country}</span></li>
                <li> <span>Address</span> <span>{step2 && step2.address}</span></li>
                <li> <span>City</span> <span>{step2 && step2.city}</span></li>
                <li> <span>Zip Code</span> <span>{step2 && step2.zip}</span></li>
            </Card.Text>
        }
        {step > 2 &&
            <Card.Subtitle>
                <div className="bullet" >3</div>
                <span>  Account Details</span>
                <div className="status">{step === 3 ? "in progress" : "complete"}</div>
            </Card.Subtitle>}{

            step > 2 &&
            <Card.Text>
                {
                    step3.reception &&
                    <li> <span>Reception</span> <span><img src={img} alt="checkmark" /></span></li>
                }
                {
                    step3.booking &&
                    <li> <span>Booking Engine</span> <span><img src={img} alt="checkmark" /></span></li>
                }
                {
                    step3.channel &&
                    <li> <span>Channel Manager </span> <span><img src={img} alt="checkmark" /></span></li>
                }
                {
                    step3.housekeeping &&
                    <li> <span>House Keeping </span> <span><img src={img} alt="checkmark" /></span></li>
                }
                {
                    step3.pos &&
                    <li> <span>POS </span> <span><img src={img} alt="checkmark" /></span></li>
                }
                {
                    step3.marketing &&
                    <li> <span>Marketing </span> <span><img src={img} alt="checkmark" /></span></li>
                }
            </Card.Text>
        }
    </Card>
}