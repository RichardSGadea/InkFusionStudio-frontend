

export const inputValidator = (inputValue, inputName) => {
    if( inputValue === ""){
        return "*"
    }
    if (inputName === "password" && (inputValue.length <8)){
        return "Password should have 8 or more characters"
    }
    if (inputName === "email" && (!inputValue.includes("@") || !inputValue.includes("."))){
        return "Invalid Email"
    }
    if((inputName === "yourPassword" && inputValue.length <8)  || (inputName === "newPassword" && inputValue.length <8)){
        return "Password should have 8 or more characters"
    }
    return ""
}