import { useEffect, useState } from 'react';
import './App.css'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Item from './components/DifficultItem';
import SelectModeSection from './components/SelectModeSection';
import InputSection from './components/InputSection';
import { Provider, useSelector } from 'react-redux';
import { RootState } from './redux/reducer';
import ListSection from './components/ListSection';

export type DifficultType = "Easy" | "Medium" | "Hard"


export const returnType = (value: DifficultType) => {
  switch (value) {
    case "Easy": return "bg-safe-bg"
    case "Medium": return "bg-warning-bg"
    case "Hard": return "bg-danger-bg"
    default: return "bg-slate-900"
  }
}

export default function App() {
  const dropDownList: DifficultType[] = [
    "Easy",
    "Medium",
    "Hard",
  ]
  const [dropdown, setDropdown] = useState(false)
  const [selected, setSelected] = useState<DifficultType>("Medium")

  const bg = useSelector((state: RootState) => state.bgColor)

  return (
    <body className={`${returnType(bg)} bg-opacity-70 flex p-3.5
        transition-colors transform duration-500 ease-in-out`} >
      <div className={`flex flex-col 
      w-mainWidth
       min-h-max shadow-black bg-slate-300 ${bg != "" ? "shadow-lg" : "shadow-md"}
        gap-2 rounded-md p-6 `}>
        <h1 className=' w-full text-center text-3xl' >Todo List</h1>

        <InputSection />

        <ListSection />
      </div>
    </body >
  )
}
