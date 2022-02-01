import React from "react";
import s from "./FormControls.module.css"
import {Field, WrappedFieldsProps} from "redux-form";

export const Textarea = ({input, meta, ...props}: any) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                <textarea {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
type InputPropsType = {
    placeholder: string
    children: React.ReactNode
} & WrappedFieldsProps

export const Input = ({input, meta, ...props}: InputPropsType) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const createField = (name: string, placeholder: string|null, validate: ((value: string) => (undefined |string))[], component: ({input, meta,...props}: any) => JSX.Element, type: any, text?: string) => (
    <div>
        <Field name={name}
               placeholder={placeholder}
               validate={validate}
               component={component}
               type={type}
        />{text}
    </div>

)