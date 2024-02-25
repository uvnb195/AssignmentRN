import { useEffect, useState } from 'react';
import './App.css'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import Item from './components/DifficultItem';
import SelectModeSection from './components/SelectModeSection';
import InputSection from './components/InputSection';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/reducer';
import ListSection from './components/ListSection';
import Loading from './components/LoadingComponent';
import { runDelete, runSuccess } from './redux/action';
import Success from './components/LoadingComponent/Success';
import Delete from './components/LoadingComponent/Delete';

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
  const dispatch = useDispatch()
  const [dropdown, setDropdown] = useState(false)
  const [selected, setSelected] = useState<DifficultType>("Medium")

  const bg = useSelector((state: RootState) => state.bgColor)
  const loading = useSelector((state: RootState) => state.loading)
  const runSuccessAnim = useSelector((state: RootState) => state.runSuccess)
  const runDeleteAnim = useSelector((state: RootState) => state.runDelete)

  useEffect(() => {
    if (runSuccessAnim == true) {
      setTimeout(() => {
        dispatch(runSuccess(false))
      }, 1500)
    }
  }, [runSuccessAnim])

  useEffect(() => {
    if (runDeleteAnim == true) {
      setTimeout(() => {
        dispatch(runDelete(false))
      }, 1000)
    }
  }, [runDeleteAnim])

  return (
    <body className={`relative ${returnType(bg)} bg-opacity-70 flex p-3.5
        transition-colors transform duration-500 ease-in-out
        `} >
      <div className='absolute top-0 bottom-0 flex justify-center items-center p-9'>
        <div className={`h-full w-full flex flex-col  shadow-black bg-slate-300 ${bg != "" ? "shadow-lg" : "shadow-md"}
        gap-2 rounded-md p-6 `}>
          <h1 className=' w-full text-center text-3xl font-semibold' >Todo List</h1>

          <InputSection />

          <ListSection />
        </div>
      </div>
      {loading
        ? <div className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-40
        backdrop-blur-sm origin-bottom
        transition-all duration-500 tranform ease-in-out
        ${loading && loading == true ? "visible bg-black" : "collapse bg-transparent"}
        `} ><Loading className='size-[200px]' />
        </div>
        : null}

      {runSuccessAnim
        ? <div className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-40
        backdrop-blur-sm origin-bottom
        transition-all duration-500 tranform ease-in-out
        ${runSuccessAnim && runSuccessAnim == true ? "visible bg-black" : "collapse bg-transparent"}
        `} ><Success className='size-[200px]' />
        </div>
        : null}

      {runDeleteAnim
        ? <div className={`absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center  bg-opacity-40
        backdrop-blur-sm origin-bottom
        transition-all duration-500 tranform ease-in-out
        ${runDeleteAnim && runDeleteAnim == true ? "visible bg-black" : "collapse bg-transparent"}
        `} >
          <Delete className='size-[200px]' />
        </div>
        : null}

    </body >
  )
}
