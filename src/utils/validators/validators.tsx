import React from "react";

export const required = (value: any) => {
    if (value) return undefined
    return "field required"
}
export const maxLengthCreator = (maxLength: number) => (value: string) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}
