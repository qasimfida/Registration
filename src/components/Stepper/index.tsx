import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import StepperHeader from './StepperHeader';
import StepperProgress from './StepperProgress';
import './styles.scss'
import check from '../../assets/icons/tick.svg';
import { IState1, IState2, IState3, IErrors1, IErrors2, IService } from '../../utils/types/stepperTypes'
import http from '../../utils/api';
import { useSnackbar } from 'notistack';


export default (props: any) => {
    const [active, setActive] = useState<Number | any>(2);
    const [isLoading, setIsLoading] = useState<Number | any>(0)
    const [userDetails, setUserDetails] = useState<IState1>({
        fullname: '',
        email: '',
        password: '',
        confirm_password: '',
        phone: '',
        termsofservice: false,
        prefix: '1'
    })
    const [propertyDetails, setPropertyDetails] = useState<IState2>({
        rate: 0,
        name: '',
        country: '',
        address: '',
        city: '',
        zip_code: ''
    })
    const [options, setOptions] = useState<IService[]>([]);
    const [errors1, setErrors1] = useState<IErrors1>({ fullname: '' });
    const [errors2, setErrors2] = useState<IErrors2>({ name: '' });
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handlePrev = () => {
        setActive(active - 1)
    }

    useEffect(()=>{
        let current = localStorage.getItem('current');
        if(current){
            setActive(parseInt(current) || 0);
            let s1:any =  localStorage.getItem('step1');
            if(s1){
                let state = JSON.parse(s1) || userDetails;
                setUserDetails(state)
            }
            let s2:any = localStorage.getItem('step2');
            if(s2){
                let state = JSON.parse(s2) || propertyDetails;
                setPropertyDetails(state)
            }
            let s3:any = localStorage.getItem('step3');
            if(s3){
                let state = JSON.parse(s3) || options;
                setOptions(state);
            }
        }
    },[]);


    const addUserData = async (key: string, body: any) => {
        try {
            let response = await http.post(key, body);
            localStorage.setItem('token', response.data.token)
            setActive(active + 1);
            localStorage.setItem('current', active)
            let noti: any = enqueueSnackbar("User registered successfully", { variant: 'success' });
            setTimeout(() => {
                closeSnackbar(noti);
            }, 4000)

        } catch (err) {
            if (err.response) {
                Object.keys(err.response.data).forEach(error => {
                    setErrors1({ ...errors1, [error]: err.response.data[error].message })
                    let noti = enqueueSnackbar(err.response.data[error].message, { variant: 'error' });
                    setTimeout(() => {
                        closeSnackbar(noti);
                    }, 4000)
                })

            }
            else {

                let noti = enqueueSnackbar("Something went wrong", { variant: 'error' });
                setTimeout(() => {
                    closeSnackbar(noti);
                }, 4000)
            }
        }
    }
    const addHotelData = async (key: string, body: any) => {
        try {
            let token: any = localStorage.getItem('token')
            let response = await http.post(key, body);
            setActive(active + 1);
            localStorage.setItem('current', active)
            let noti: any = enqueueSnackbar("Hotel registered successfully", { variant: 'success' });
            setTimeout(() => {
                closeSnackbar(noti);
            }, 4000)

        } catch (err) {
            if (err.response) {
                Object.keys(err.response.data).forEach(error => {
                    setErrors1({ ...errors1, [error]: err.response.data[error].message })
                    let noti = enqueueSnackbar(err.response.data[error].message, { variant: 'error' });
                    setTimeout(() => {
                        closeSnackbar(noti);
                    }, 4000)
                })

            }
            else {

                let noti = enqueueSnackbar("Something went wrong", { variant: 'error' });
                setTimeout(() => {
                    closeSnackbar(noti);
                }, 4000)
            }
        }
    }
    const addServices = async (key: string, services: any) => {
        try {
            let token: any = localStorage.getItem('token')
            let response = await http.post(key, {services}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setActive(active + 1);
            localStorage.setItem('current', active)
            let noti: any = enqueueSnackbar("Services registered successfully", { variant: 'success' });
            setTimeout(() => {
                closeSnackbar(noti);
            }, 4000)
            return response

        } catch (err) {
            if (err.response) {
                Object.keys(err.response.data).forEach(error => {
                    let noti = enqueueSnackbar(err.response.data[error].message, { variant: 'error' });
                    setTimeout(() => {
                        closeSnackbar(noti);
                    }, 4000)
                })

            }
            else {

                let noti = enqueueSnackbar("Something went wrong", { variant: 'error' });
                setTimeout(() => {
                    closeSnackbar(noti);
                }, 4000)
            }
        }
    }

    const handleNext = async () => {
        let details: any = userDetails;
        if (active === 0) {
            localStorage.setItem('step1', JSON.stringify(details))
            await addUserData('/register/hotel', { ...details, termsofservice: 1 });
        }
        if (active === 1) {
            localStorage.setItem('step2', JSON.stringify(propertyDetails))
            await addHotelData('/hotel/registerhotel', propertyDetails);
        }
        if (active === 2) {
            localStorage.setItem('step3', JSON.stringify(options))
            let arr = options.map((item) => item.id);
            let a:any = await addServices('hotel/registerservices', arr);
            console.log(a);
            if (a && a.status === 200) {
                setTimeout(() => {
                    let body: any = document.getElementById('body-overlay');
                    if (body) {
                        body.classList.add('overlay-before')
                    }
                }, 10)
                setTimeout(() => {
                    let body: any = document.getElementById('body-overlay');
                    body.classList.add('overlay-after')
                }, 2000)
                setTimeout(() => {
                    let body: any = document.getElementById('stepper');
                    body.classList.add('overlay-text')
                }, 1000);
                setTimeout(() => {
                    let sidebar: any = document.getElementById('sibebar-left');
                    sidebar.classList.add('overlay-hide')
                    postData()
                    setIsLoading(1)
                }, 1500)
            }
        }
    }

    const postData = async () => {
        setTimeout(() => {
            let steper: any = document.getElementById('stepper');
            steper.classList.add('add-flex')
            // animation(id1, 'step1', 30.5, 155)
            // animation(id2, 'step2', 0, 195)
            // animation(id3, 'step3', -30.5, 235)
        }, 1000);
        setTimeout(() => {
            let sidebar: any = document.getElementById('sibebar-left');
            sidebar.classList.add('overlay-blink');
        }, 1000);
        setTimeout(() => {
            setIsLoading(2)
        }, 5000);


    }

    let id1: any = null;
    let id2: any = null;
    let id3: any = null;
    const animation = (id: any, key: string, endTop: string | number, endLeft: string | number) => {
        let elem: any = document.getElementById(key);;
        if (elem) {

            let posLeft = 0;
            let posTop = 0;
            clearInterval(id);
            let frame = () => {
                if (posTop === endTop && posLeft === endLeft) {
                    clearInterval(id);
                } else {
                    if (endTop >= 0 && posTop < endTop) {
                        posTop += 0.5
                        elem.style.top = (posTop) + "vh";
                    }
                    if (endLeft >= 0 && posLeft < endLeft) {
                        posLeft += 5
                        elem.style.left = (posLeft) + "%";
                    }
                    if (endTop < 0 && posTop > endTop) {
                        posTop -= 0.5
                        elem.style.top = (posTop) + "vh";
                    }
                    if (endLeft < 0 && posLeft < endLeft) {
                        posLeft -= 5
                        elem.style.left = (posLeft) + "%";
                    }
                }
            }
            id = setInterval(frame, 10);

        }
    }

    const renderStep = () => {
        switch (active) {
            case 0:
                return <Step1 errors={errors1} setErrors={setErrors1} handleSubmit={() => handleNext()} data={userDetails} handleChange={(key: string | any, value: any) => setUserDetails({ ...userDetails, [key]: value })} />
            case 1:
                return <Step2 errors={errors2} setErrors={setErrors2} handleSubmit={() => handleNext()} data={propertyDetails} handleToggle={(key: string | any, value: any) => setPropertyDetails({ ...propertyDetails, [key]: value })} handleChange={(key: string | any, value: any) => setPropertyDetails({ ...propertyDetails, [key]: value })} />
            default:
                return <Step3 handleSubmit={() => handleNext()} data={options} handleChange={(key: IService) => {
                    let has = options.filter(item => item.id === key.id);
                    if (has.length) {

                        let option = options.filter(item => item.id !== key.id)
                        setOptions(option)
                    }
                    else {
                        setOptions([...options, key])
                    }
                }}
                />
            // default:
            //     return <Step1 errors={errors1} setErrors={setErrors1} handleSubmit={() => handleNext()} data={userDetails} handleChange={(key: string | any, value: any) => setUserDetails({ ...userDetails, [key]: value })} />
        }
    }

    console.log(active)
    return <div id="stepper" className={`form stepper ${active > 2 ? 'loader-animation' : ''}`}>
        <div id="sibebar-left" className={`sidebar-left `}>
            <div className={`sidebar ${isLoading === 2 ? 'd-none' : ''}`} >
                <div id="step1" className={`steps ${active > 0 ? 'fill' : ''} ${active === 0 ? "active" : ''} `} > <div className="circle">
                    <span className="before" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="61.024" height="61.336" viewBox="0 0 61.024 61.336">
                            <g id="Group_408" data-name="Group 408" transform="translate(0 0)">
                                <path id="Path_3341" data-name="Path 3341" d="M101.005,89.4a18.184,18.184,0,1,0-24.987,0C64.54,93.012,58,101.593,58,113.168v5.856h20.65v-1.849h-18.8v-4.007A21.828,21.828,0,0,1,64.957,98.46a25.845,25.845,0,0,1,13.2-7.754l1.809-.475-1.476-1.149a16.335,16.335,0,1,1,20.047,0L97.059,90.23l1.809.475a25.846,25.846,0,0,1,13.2,7.754,21.829,21.829,0,0,1,5.108,14.708v4.007h-18.8v1.849h20.65v-5.856C119.024,101.593,112.484,93.012,101.005,89.4Z" transform="translate(-58 -58)" fill="#fff" />
                                <path id="Path_3342" data-name="Path 3342" d="M213.252,293.914l-.324-1.821-7.48,1.33-.484-.861-.484.861-7.48-1.33-.324,1.82,6.844,1.217-7.853,13.961,9.3,8.264,9.3-8.264-7.853-13.961Zm-8.288,20.968-6.955-6.183,6.955-12.365,6.955,12.365Z" transform="translate(-174.451 -256.019)" fill="#fff" />
                            </g>
                        </svg>

                    </span>
                    <span className="after" >
                        <img src={check} alt="ceckmark" />
                    </span>
                </div> <span className="step-label">Select Services</span></div>
                <div className={`vertical-divider ${active > 0 ? 'fill' : ''}`} ></div>
                <div id="step2" className={`steps ${active > 1 ? 'fill' : ''} ${active === 1 ? "active" : ''} ${active === 0 ? "disabled" : ''}`}  > <div className="circle">
                    <span className="before" >
                        <svg id="Group_1207" data-name="Group 1207" xmlns="http://www.w3.org/2000/svg" width="49.869" height="77.07" viewBox="0 0 49.869 77.07">
                            <g id="Group_1206" data-name="Group 1206" transform="translate(0 0)">
                                <path id="Path_4372" data-name="Path 4372" d="M329.465,669.438a1.133,1.133,0,0,1-1.645-1.194l.662-3.864-2.806-2.736a1.133,1.133,0,0,1,.628-1.934l3.88-.563,1.734-3.516a1.134,1.134,0,0,1,2.033,0l1.734,3.516,3.88.563a1.133,1.133,0,0,1,.628,1.934l-2.806,2.736.662,3.864a1.133,1.133,0,0,1-1.645,1.194l-3.469-1.824Zm2.942-4.107a1.133,1.133,0,0,1,1.054,0l1.965,1.033-.375-2.187a1.131,1.131,0,0,1,.325-1l1.589-1.549-2.2-.319a1.134,1.134,0,0,1-.854-.62l-.983-1.99-.983,1.99a1.133,1.133,0,0,1-.853.62l-2.2.319,1.589,1.549a1.131,1.131,0,0,1,.325,1l-.375,2.188Zm-17.676,8.641a1.133,1.133,0,0,1-1.645-1.195l.662-3.864-2.806-2.736a1.133,1.133,0,0,1,.628-1.934l3.88-.563,1.734-3.516a1.134,1.134,0,0,1,2.033,0l1.734,3.516,3.88.563a1.133,1.133,0,0,1,.628,1.934l-2.806,2.736.662,3.864a1.133,1.133,0,0,1-1.645,1.195l-3.469-1.824Zm2.942-4.107a1.132,1.132,0,0,1,1.054,0l1.965,1.032-.375-2.187a1.131,1.131,0,0,1,.325-1l1.589-1.549-2.2-.318a1.134,1.134,0,0,1-.853-.62l-.983-1.99-.983,1.99a1.134,1.134,0,0,1-.853.62l-2.2.318,1.589,1.549a1.131,1.131,0,0,1,.325,1l-.375,2.187Zm26.526,4.107a1.133,1.133,0,0,1-1.645-1.195l.662-3.864-2.806-2.736a1.133,1.133,0,0,1,.628-1.934l3.88-.563,1.734-3.516a1.134,1.134,0,0,1,2.033,0l1.734,3.516,3.88.563a1.133,1.133,0,0,1,.628,1.934l-2.806,2.736.662,3.864a1.133,1.133,0,0,1-1.645,1.195l-3.469-1.824Zm2.942-4.107a1.132,1.132,0,0,1,1.054,0l1.965,1.032-.375-2.187a1.131,1.131,0,0,1,.325-1l1.589-1.549-2.2-.318a1.134,1.134,0,0,1-.853-.62l-.983-1.99-.983,1.99a1.134,1.134,0,0,1-.853.62l-2.2.318,1.589,1.549a1.131,1.131,0,0,1,.325,1l-.375,2.187Zm9.594,62.206h-47.6A1.134,1.134,0,0,1,308,730.937v-40.8A1.134,1.134,0,0,1,309.133,689H328.4v-5.667a1.134,1.134,0,0,1,1.133-1.133h27.2a1.134,1.134,0,0,1,1.133,1.133v47.6A1.134,1.134,0,0,1,356.735,732.07ZM348.8,729.8h6.8V684.468H330.668V729.8h6.8V717.336A1.134,1.134,0,0,1,338.6,716.2h9.067a1.134,1.134,0,0,1,1.133,1.133Zm-20.4,0V691.268H310.267V729.8Zm11.334,0h6.8V718.469h-6.8Zm-3.4-20.4a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm10.2,0a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm-10.2-15.867a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm10.2,0a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm-10.2,7.934a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm10.2,0a1.133,1.133,0,0,1,0-2.267h3.4a1.133,1.133,0,0,1,0,2.267Zm-30.6,20.4a1.133,1.133,0,1,1,0-2.267h6.8a1.133,1.133,0,1,1,0,2.267Zm0-10.2a1.133,1.133,0,1,1,0-2.267h6.8a1.133,1.133,0,0,1,0,2.267Zm0-10.2a1.133,1.133,0,0,1,0-2.267h6.8a1.133,1.133,0,0,1,0,2.267Z" transform="translate(-308 -655)" fill="#fff" fillRule="evenodd" />
                            </g>
                        </svg>

                    </span>
                    <span className="after" >
                        <img src={check} alt="ceckmark" />
                    </span>
                </div> <span className="step-label">Property Details</span></div>
                <div className={`vertical-divider ${active > 1 ? 'fill' : ''}`} ></div>
                <div id="step3" className={`steps ${active > 2 ? 'fill' : ''} ${active === 2 ? "active" : ''} ${active === 1 ? "disabled" : ''}`} > <div className="circle">
                    <span className="before">
                        <svg id="Group_1209" data-name="Group 1209" xmlns="http://www.w3.org/2000/svg" width="62.267" height="62.026" viewBox="0 0 62.267 62.026">
                            <path id="Path_3349" data-name="Path 3349" d="M46.753,46.388a1.476,1.476,0,0,1-1.474,1.475H23.867a1.476,1.476,0,0,1-1.474-1.475V24.977A1.476,1.476,0,0,1,23.867,23.5H38.6V21.536H23.867a3.445,3.445,0,0,0-3.44,3.44V46.388a3.445,3.445,0,0,0,3.44,3.44H45.279a3.445,3.445,0,0,0,3.44-3.44V32.242H46.753V46.388ZM27.282,31.809,26,33.3l7.428,6.374,15.812-17.52-1.459-1.317-14.528,16.1Z" transform="translate(13.024 -20.837)" fill="#fff" />
                            <path id="Union_14" data-name="Union 14" d="M17.587,28.292H3.441A3.445,3.445,0,0,1,0,24.851V3.441A3.445,3.445,0,0,1,3.441,0H24.851a3.445,3.445,0,0,1,3.441,3.441V24.851a3.445,3.445,0,0,1-3.441,3.441Zm7.265-1.966a1.476,1.476,0,0,0,1.474-1.474h0V3.441a1.476,1.476,0,0,0-1.475-1.474H3.441A1.476,1.476,0,0,0,1.967,3.441V24.851a1.476,1.476,0,0,0,1.474,1.474Z" transform="translate(0 0.699)" fill="#fff" />
                            <path id="Union_15" data-name="Union 15" d="M17.587,28.292H3.441A3.445,3.445,0,0,1,0,24.851V3.441A3.445,3.445,0,0,1,3.441,0H24.851a3.445,3.445,0,0,1,3.441,3.441V24.851a3.445,3.445,0,0,1-3.441,3.441Zm7.265-1.966a1.476,1.476,0,0,0,1.474-1.474h0V3.441a1.476,1.476,0,0,0-1.475-1.474H3.441A1.476,1.476,0,0,0,1.967,3.441V24.851a1.476,1.476,0,0,0,1.474,1.474Z" transform="translate(0 33.734)" fill="#fff" />
                            <path id="Union_16" data-name="Union 16" d="M17.587,28.292H3.441A3.445,3.445,0,0,1,0,24.851V3.441A3.445,3.445,0,0,1,3.441,0H24.851a3.445,3.445,0,0,1,3.441,3.441V24.851a3.445,3.445,0,0,1-3.441,3.441Zm7.265-1.966a1.476,1.476,0,0,0,1.474-1.474h0V3.441a1.476,1.476,0,0,0-1.475-1.474H3.441A1.476,1.476,0,0,0,1.967,3.441V24.851a1.476,1.476,0,0,0,1.474,1.474Z" transform="translate(33.451 33.734)" fill="#fff" />
                        </svg>

                    </span>
                    <span className="after" >
                        <img src={check} alt="ceckmark" />
                    </span>
                </div> <span className="step-label">Select Services</span></div>
            </div>
            <div className="loading-message" >
                <h3>{isLoading === 1 ? "WE ARE SETTING UP YOUR HOLA ACCOUNT" : "Request Sucessfully"}</h3>
                {isLoading === 1 &&
                    <p>Do not go away from here, be patient...</p>
                }
            </div>
        </div>
        <div className="stepper-body form" id="body-overlay" >
            <StepperHeader className='stepper-header' title="What kind of property do you have?" text="Select the type of your property for an easy setup!" />
            <div className=" stepper-content">
                <Container fluid className="px-0" >
                    <Row className="align-end" >
                        <Col xs={12} sm={12} md={7} className="pr-4 ps-0 float" >
                            {renderStep()}
                        </Col>
                        <Col xs={12} sm={12} md={5} className="pl-4 pe-0 float " >
                            <div className="sidebar-right">
                                <StepperProgress step={active + 1} step1={userDetails} step2={propertyDetails} step3={options} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    </div>
}