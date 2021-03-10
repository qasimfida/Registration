export interface IStep {
    setErrors?: (props: any) => void
    handleSubmit: () => void
    handleChange: (key: string | any ,value: any) => void

}
export interface IErrors1 extends IState1 {

}
export interface IErrors2 extends IState2 {

}

export interface IState1 {
    fullname: string
    email?: string
    password?: string
    confirm_password?: string
    phone?: string | number
    termsofservice?: Boolean
    prefix?: number | string
}
export interface IState2 {
    rate?: number
    name?: string
    country?: string
    address?: string
    city?: string
    zip_code?: string
}
export interface IState3 {
    reception?: Boolean
    booking?: Boolean
    pos?: Boolean
    marketing?: Boolean
    channel?: Boolean
    housekeeping?: Boolean
}
export interface IService {
    id: number
    name: string
    description: string
    image: string
    color: string
    required: Boolean
}
export interface IStep1 extends IStep {
    data: IState1
    errors: IState1

}
export interface IStep2 extends IStep {
    handleToggle: (key: string | any, value: any) => void
    data: IState2
    errors: IState2
}
export interface IStep3 extends IStep {
    data: IService[]
    handleChange: (key: IService) => any
}
export interface IHeader {
    className?: string
    title?: string
    text?: string
}
export interface IProgress {
    step: Number | any
    step1: IState1
    step2: IState2
    step3: IService[]
}

export interface IFeature {
    handleSubmit:()=> void
    onChange: (key: string, event: any) => void
    data: IState2
}