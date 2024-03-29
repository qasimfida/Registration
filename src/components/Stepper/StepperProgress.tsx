import React from 'react';
import { Card } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';
import img from '../../assets/icons/tickfill.svg';
import { IProgress, IService } from '../../utils/types/stepperTypes'


export default (props: IProgress) => {
    const { step, step1, step2, step3 } = props;
    console.log(step)
    return <Card className="stepper-progress" >
        <Card.Title>Setup Progress <span> <b>{4 - step}</b> STEPS LEFT  </span></Card.Title>
        <ProgressBar now={((step - 1) * 33.33) || 5} label={`${((step - 1) * 33.33) || 5}%`} />
        <Card.Subtitle>
            <div className="bullet" >1</div>
            <span>  Account Details</span>
            <div className={`status ${step === 1 ? '' : 'completed'}`}>{step === 1 ? "in progress" : "complete"}</div>
        </Card.Subtitle>
        {step > 1 &&
            <Card.Text>
                <li> <span>Name & Surname</span> <span>{step1 && step1.fullname}</span></li>
                <li> <span>Email</span> <span>{step1 && step1.email}</span></li>
                <li> <span>Phone No</span> <span>{step1 && step1.phone}</span></li>
                <li> <span>Password</span> <span>********</span></li>
            </Card.Text>
        }
        {step > 1 &&
            <Card.Subtitle>
                <div className="bullet" >2</div>
                <span>  Account Details</span>
                <div className={`status ${step <= 2 ? '' : 'completed'}`}>{step <= 2 ? "in progress" : "complete"}</div>
                
            </Card.Subtitle>}{

            step > 2 &&
            <Card.Text>
                <li> <span>Hotel Stars </span> <span>{step2 && step2.rate}</span></li>
                <li> <span>Hotel Name</span> <span>{step2 && step2.name}</span></li>
                <li> <span>Country</span> <span>{step2 && step2.country}</span></li>
                <li> <span>Address</span> <span>{step2 && step2.address}</span></li>
                <li> <span>City</span> <span>{step2 && step2.city}</span></li>
                <li> <span>Zip Code</span> <span>{step2 && step2.zip_code}</span></li>
            </Card.Text>
        }
        {step > 2 &&
            <Card.Subtitle>
                <div className="bullet" >3</div>
                <span>  Account Details</span>
                <div className={`status ${step <= 3 ? '' : 'completed'}`}>{step === 3 ? "in progress" : "complete"}</div>
            </Card.Subtitle>}{

            step > 2 &&
            <Card.Text>
                {
                    step3.map((item: IService) => (<li> <span>{item.name}</span> <span><img src={img} alt="checkmark" /></span></li>))
                }
               
            </Card.Text>
        }
    </Card>
}