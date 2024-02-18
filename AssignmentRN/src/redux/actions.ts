export const updateLogger = (value: string) => {
    return ({
        type: "Update Logging State",
        payload: value
    })
}

export const logSomeThingElse = () => ({
    type: "ResetLogger"
})