import { useEffect, useState } from "react"
import SelectModeSection from "../SelectModeSection"
import { IoCheckmark, IoCloseOutline } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { changeBackground } from "../../redux"
import { PiWarningBold } from "react-icons/pi";
import { api } from "../../api/client"
import { addTodo, fetchItem, removeTodo, toggleLoading } from "../../redux/action"
import { RootState } from "../../redux/reducer"
import { returnType } from "../../App"
import { BiEditAlt } from "react-icons/bi"

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

    const editItem = useSelector((state: RootState) => state.editItem)

    useEffect(() => {
        if (editItem && editItem.title &&
            editItem.desc &&
            editItem.difficult) {
            const state = {
                title: editItem?.title || "",
                desc: editItem?.desc || "",
                difficult: editItem?.difficult || ""
            }
            handleInput(state)
            dispatch(changeBackground(state.difficult))
        }
    }, [editItem])

    useEffect(() => {
        setShowError(false)
        setErrorMessage(null)
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
        if (title.length < 3) {
            setErrorMessage({ type: "Title", message: "Title is too short" })
            return false
        }
        if (desc.length < 3) {
            setErrorMessage({ type: "Desc", message: "Description is too short" })
            return false
        }
        setErrorMessage(null)
        return true
    }

    const handleClear = () => {
        setShowError(false);
        setErrorMessage(null)
        if (editItem) {
            dispatch(addTodo(editItem))
            dispatch(fetchItem({}))
        }
        dispatch(changeBackground(""))
        handleInput(initState)
    }

    const handleSubmit = async () => {
        dispatch(toggleLoading(true))
        setShowError(true);
        const validation = validationInput()
        if (validation) {
            let convertInput = {}
            console.log("Check edit item:", editItem);

            if (editItem && editItem.title &&
                editItem.desc &&
                editItem.difficult) {
                console.log("update 195");
                convertInput = ({
                    ...editItem,
                    title: input.title,
                    desc: input.desc,
                    difficult: input.difficult,
                    isDone: false,
                    createAt: Date.now()
                })
                await api.HandleRequest('/todo/item', 'post',
                    {
                        ...editItem,
                        title: input.title,
                        desc: input.desc,
                        difficult: input.difficult,
                        isDone: false
                    })
                dispatch(addTodo(convertInput))
            } else {
                console.log("add new 195");

                convertInput = ({ ...input, createAt: Date.now() })
                await api.HandleRequest('/todo/add', 'put', convertInput)
                dispatch(addTodo(convertInput))
            }

            dispatch(changeBackground(""))
            handleInput(initState)
            setShowError(false)
            // add animation success
        }

        dispatch(toggleLoading(false))
    }

    return (
        <>
            <SelectModeSection onChange={(value) => { handleInput((prevState) => ({ ...prevState, difficult: value })) }} />
            <input className={`py-2 px-4 rounded-md border-2 font-bold text-lg
                focus:outline-none
                hover:scale-105  bg-primary bg-opacity-5
                hover:bg-opacity-75 hover:bg-white
                ${showError && errorMessage?.type == "Title" ? "border-error" : "border-slate-700"}
                `}
                placeholder="Title"
                value={input.title}
                onChange={(v) => handleInput((prevState) => ({ ...prevState, title: v.target.value }))
                }
            />
            <textarea className={`py-2 px-4 rounded-md border-2 resize-none
                focus:outline-none
                hover:scale-105 hover:border-2 bg-primary bg-opacity-5
                hover:bg-opacity-75 hover:bg-white
                ${showError && errorMessage?.type == "Desc" ? "border-error" : "border-slate-700"}
                `} placeholder="Description" rows={4} cols={50}
                value={input.desc}
                onChange={(v) => handleInput((prevState) => ({ ...prevState, desc: v.target.value }))} />

            <div className={`flex flex-row gap-2 justify-between items-center
                w-full`}>

                {/* error message */}
                <div className={`flex flex-row items-center gap-2 ml-2 origin-left ${showError ? "scale-100 visible w-[100%]" : "scale-0 collapse"}
                transition-transform duration-200 transform ease-in-out
                `}>
                    <PiWarningBold className="text-error size-5" />
                    <h3 className="text-error text-sm font-bold">{errorMessage?.message || ""}</h3>
                </div>

                <div className="flex flex-row gap-2 justify-end items-center
                w-full">
                    {/* button section */}
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
            </div>
        </>
    )
}

export default InputSection