import { useEffect, useState } from "react"
import SelectModeSection from "../SelectModeSection"
import { IoCheckmark, IoCloseOutline } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { changeBackground } from "../../redux"
import { PiWarningBold } from "react-icons/pi";
import { api } from "../../api/client"

const InputSection = () => {
    const dispatch = useDispatch()
    const initState = { title: "", desc: "", difficult: "" }
    const [input, handleInput] = useState(initState)
    const [hoverSubmit, setHoverSubmit] = useState(false);
    const [hoverClear, setHoverClear] = useState(false);

    const [enableClear, setEnableClear] = useState(false);
    const [enableSubmit, setEnableSubmit] = useState(false);

    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState<{ type: string, message: string } | null>(null)

    useEffect(() => {
        setEnableClear(isAnyFill());
        setEnableSubmit(!isAnyBlank())
    }, [input])

    const isAnyBlank = () => {
        if (input.title == "" || input.desc == "" || input.difficult == "") {
            return true
        }
        return false
    }

    const isAnyFill = () => {
        return (input.title.length > 0 || input.desc.length > 0 || input.difficult.length > 0)
    }

    const validationInput = () => {
        const { title, desc } = input
        if (title.length < 5) {
            setErrorMessage({ type: "Title", message: "Title is too short" })
            return false
        }
        if (desc.length < 10) {
            setErrorMessage({ type: "Desc", message: "Description is too short" })
            return false
        }
        setErrorMessage(null)
        return true
    }

    const handleClear = () => {
        setShowError(false);
        setErrorMessage(null)
        dispatch(changeBackground(""))
        handleInput(initState)
    }

    const handleSubmit = async () => {
        setShowError(true);
        const validation = validationInput()
        if (validation) {
            console.log("Last check input:", input);

            setShowError(false)
            dispatch(changeBackground(""))
            handleInput(initState)
            const res = await api.HandleRequest('/todo/add', 'put', { ...input })
            console.log(res);
            // add animation success
        }
    }

    return (
        <>
            <SelectModeSection onChange={(value) => { handleInput((prevState) => ({ ...prevState, difficult: value })) }} />
            <input className={`py-2 px-4 rounded-md border-2 font-bold text-lg
                hover:scale-105 hover:border-2 border-slate-700 hover:bg-primary hover:bg-opacity-5
                ${showError && errorMessage?.type == "Title" ? "border-error" : ""}
                `}
                placeholder="Title"
                value={input.title}
                onChange={(v) => handleInput((prevState) => ({ ...prevState, title: v.target.value }))
                }
            />
            <textarea className={`py-2 px-4 rounded-md border-2 resize-none
                hover:scale-105 hover:border-2 border-slate-700 hover:bg-primary hover:bg-opacity-5
                ${showError && errorMessage?.type == "Desc" ? "border-error" : ""}
                `} placeholder="Description" rows={4} cols={50}
                value={input.desc}
                onChange={(v) => handleInput((prevState) => ({ ...prevState, desc: v.target.value }))} />

            {/* error message */}
            <div className={`flex flex-row items-center gap-2 ml-2 origin-left ${showError ? "scale-100" : "scale-0"}
                transition-transform duration-200 transform ease-in-out
            `}>
                <PiWarningBold className="text-error size-5" />
                <h3 className="text-error text-sm font-bold">{errorMessage?.message || ""}</h3>
            </div>

            {/* button section */}
            <div className={`flex flex-row gap-2 justify-end items-center`}>
                <button className={`${!enableClear ? "bg-slate-400" : "bg-error hover:border-slate-700 hover:scale-110 "} p-2 rounded-full border-2
                transition-all duration-300 tranform ease-in-out`}
                    type="reset"
                    onClick={() => {
                        if (enableClear) handleClear()
                    }}
                    onMouseOver={() => setHoverClear(true)}
                    onMouseLeave={() => setHoverClear(false)}>
                    <IoCloseOutline className={`size-6 ${enableClear && hoverClear ? "text-black" : "text-white"}`} />
                </button>
                <button className={`${!enableSubmit ? "bg-slate-400" : "bg-submit hover:border-slate-700 hover:scale-110 "} p-2 rounded-full border-2
                transition-all duration-300 tranform ease-in-out`}
                    type="submit"
                    onClick={() => {
                        if (enableSubmit) handleSubmit()
                    }}
                    onMouseOver={() => setHoverSubmit(true)}
                    onMouseLeave={() => setHoverSubmit(false)}>
                    <IoCheckmark className={`size-6 ${enableSubmit && hoverSubmit ? "text-black" : "text-white"}`} />
                </button>
            </div>
        </>
    )
}

export default InputSection