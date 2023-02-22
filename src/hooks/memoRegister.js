

export const RegisterMemo = (stateRegister, newRegister) =>{

    console.log(stateRegister, newRegister)
    return [...stateRegister,
            newRegister]
}