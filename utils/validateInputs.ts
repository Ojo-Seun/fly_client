

type InputsRegEx = {
    name: RegExp,
    email: RegExp,
    password: RegExp,
    confirmPassword:RegExp
}


const inputsRegEx = new Map([
    ["name", /^[A-Za-z]{3,20}\s[A-Za-z]{3,20}$/],
    ["email", /^[a-zA-Z0-9_]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,3})?$/],
    ["password", /^[^('"()\\.)]{8,}$/],
    ["confirmPassword", /^[^('"()\\.)]{8,}$/],
    ["country", /^[A-Za-z]{3,20}(\s[A-Za-z]{3,20})?$/],
    ["city", /^[A-Za-z]{3,20}(\s[A-Za-z]{3,20})?$/],
    ["phoneNo", /^[+][0-9]{3}[0-9]{10}$/],
    ["postalCode", /^[^('"()\\.)]{6,8}$/],
    ["address", /^[^('"()\\.)]{8,}$/],
])

const validateInput = (name: string, value: string) => {
    
            const isValid = inputsRegEx.get(name)?.test(value)
            return isValid
            
    
}


export default validateInput