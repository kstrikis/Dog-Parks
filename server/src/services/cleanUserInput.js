const cleanUserInput = formInput => {
    Object.keys(formInput).forEach(field => {
        if(formInput[field] === "" || formInput[field] === null) {
            delete formInput[field]
        }
    })
    return formInput
}

export default cleanUserInput