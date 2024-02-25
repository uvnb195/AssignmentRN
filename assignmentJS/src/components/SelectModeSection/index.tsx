import { useCallback, useEffect, useState } from "react";
import { DifficultType, returnType } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { changeBackground } from "../../redux/action";
import { RootState } from "../../redux/reducer";

type SelectModeSectionProps = {
    onChange: (value: string) => void
}

const SelectModeSection = (props: SelectModeSectionProps) => {
    const dispatch = useDispatch()
    const backgroundState = useSelector((state: RootState) => state.bgColor)
    const [selected, setSelected] = useState<DifficultType | null>(null)

    useEffect(() => {
        if (selected) {
            props.onChange(selected)
            dispatchUseCallBack(selected)
        }
    }, [selected])

    const dispatchUseCallBack = useCallback((value: DifficultType) => {
        dispatch(changeBackground(value))
    }, [selected])

    useEffect(() => {
        if (!backgroundState || backgroundState == "") {
            setSelected(null)
        } else {
            setSelected(backgroundState)
        }
    }, [backgroundState])
    return (
        <div className="grid grid-cols-3 p-1 gap-4">
            <button className={` shadow-md
            col-span-1  border-2 ${selected == "Easy" ? "bg-safe hover:border-white" : "hover:border-gray-500 bg-primary bg-opacity-5 hover:bg-opacity-75 hover:bg-white"}
            text-2xl p-1 rounded-md hover:scale-110
            transition-all duration-500 transform ease-in-out
            `}
                onClick={() => {
                    setSelected("Easy")
                }}>Easy</button>
            <button className={`shadow-md
            col-span-1  border-2 ${selected == "Medium" ? "bg-warning hover:border-white" : "hover:border-gray-500 bg-primary bg-opacity-5 hover:bg-opacity-75 hover:bg-white"} text-2xl p-1 rounded-md hover:scale-110
            transition-all duration-500 transform ease-in-out`}
                onClick={() => {
                    setSelected("Medium")
                }}>Medium</button>
            <button className={`shadow-md
            col-span-1  border-2 ${selected == "Hard" ? "bg-danger hover:border-white" : "hover:border-gray-500 bg-primary bg-opacity-5 bg-hover:bg-opacity-75 hover:bg-white"} text-2xl p-1 rounded-md hover:scale-110
            transition-all duration-500 transform ease-in-out`}
                onClick={() => {
                    setSelected("Hard")
                }}>Hard</button>
        </div >
    )
}

export default SelectModeSection;