import { useCallback, useEffect, useState } from "react";
import { DifficultType } from "../../App";
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
        const type = returnType(value)
        dispatch(changeBackground(type))
    }, [selected])

    const returnType = (value: DifficultType) => {
        switch (value) {
            case "Easy": return "bg-safe-bg"
            case "Medium": return "bg-warning-bg"
            case "Hard": return "bg-danger-bg"
            default: return ""
        }
    }

    useEffect(() => {
        if (backgroundState == "") {
            setSelected(null)
        }
    }, [backgroundState])
    return (
        <div className="grid grid-cols-3 p-1 gap-4">
            <button className={`hover:border-gray-500 shadow-md
            col-span-1  border-2 ${selected == "Easy" ? "bg-safe" : "hover:bg-primary hover:bg-opacity-5"}
            text-2xl p-1 rounded-md hover:scale-110
            transition-colors duration-500 transform ease-in-out
            `}
                onClick={() => {
                    setSelected("Easy")
                }}>Easy</button>
            <button className={`hover:border-gray-500 shadow-md
            col-span-1  border-2 ${selected == "Medium" ? "bg-warning" : "hover:bg-primary hover:bg-opacity-5"} text-2xl p-1 rounded-md hover:scale-110
            transition-colors duration-500 transform ease-in-out`}
                onClick={() => {
                    setSelected("Medium")
                }}>Medium</button>
            <button className={`hover:border-gray-500 shadow-md
            col-span-1  border-2 ${selected == "Hard" ? "bg-danger" : "hover:bg-primary hover:bg-opacity-5"} text-2xl p-1 rounded-md hover:scale-110
            transition-colors duration-500 transform ease-in-out`}
                onClick={() => {
                    setSelected("Hard")
                }}>Hard</button>
        </div >
    )
}

export default SelectModeSection;