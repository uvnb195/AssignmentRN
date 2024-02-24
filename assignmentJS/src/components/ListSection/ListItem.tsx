import { useState } from "react"
import { FaCheckDouble, FaMarker } from "react-icons/fa6"
import { FaRegCircle, FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa"
import { api } from "../../api/client"
import { fetchItem, fetchTodo, removeTodo } from "../../redux/action"
import { useDispatch } from "react-redux"

type ListItemProps = {
    data: {
        _id: string,
        title: string,
        difficult: string,
        desc: string,
        isDone?: boolean,
        createAt: Date
    }
    createAt?: Date,
}

const ListItem = (props: ListItemProps) => {
    const dispatch = useDispatch()

    const [isHovered, setIsHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isCheckHovered, setIsCheckHovered] = useState(false);
    const [isDone, setIsDone] = useState(props.data.isDone);

    const typeName = (type: string) => {
        switch (type) {
            case "Easy": return "safe"
            case "Medium": return "warning"
            default: return "danger"
        }
    }
    const { _id, title, difficult, desc, createAt } = props.data
    console.log("_ID:", _id);


    const dateMessage = () => {

        //get date in GMT+7 time
        let offset = 7;
        const current = new Date(Date.now())
        const myCurrent = new Date(current.getTime() + offset * 3600 * 1000)

        const date = new Date(createAt)
        const myDate = new Date(date.getTime() + offset * 3600 * 1000)

        const day = myDate.getUTCDate()
        const month = myDate.getUTCMonth()
        const year = myDate.getUTCFullYear()
        const time = `${day < 10 ? `0${day}` : day}/${month + 1 < 10 ? `0${month + 1}` : month + 1}/${year < 10 ? `0${year}` : year}`
        console.log("Date:", time);


        let difTime = myCurrent.getTime() - myDate.getTime()

        let difDays = Math.floor(difTime / (1000 * 3600 * 24))
        console.log("Diffdays", difDays);


        if (difDays >= 7) {
            const time = `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year < 10 ? `0${year}` : year}`
            return time
        }
        else if (difDays > 0)
            return `Created ${difDays} day${difDays > 1 ? "s" : ""} ago.`
        else {
            let difHours = difDays == 0 ? Math.floor(difTime / (1000 * 3600)) : 0
            console.log("difHours: ", difHours);
            if (difHours > 0) return `Created ${difHours} hour${difHours > 1 ? "s" : ""} ago`
            else {
                let difMins = difHours == 0 ? Math.floor(difTime / (1000 * 60)) : 0
                console.log("difMins: ", difMins);
                if (difMins > 0) return `Created ${difMins} minute${difMins > 1 ? "s" : ""} ago`
                else return `A few seconds ago`
            }
        }
    }

    const handleDelete = async () => {
        const res = await api.HandleRequest(`/todo/delete?id=${_id}`, 'post')
        dispatch(removeTodo(_id))
        console.log("delete:", res);
    }

    const handleUpdate = async () => {
        const res = await api.HandleRequest('/todo/item', 'post', { ...props.data, isDone: true })
        if (res.status == 201) {
            setIsDone(true)
            return
        }

        alert("Server Error. Try Again later.")
    }

    const handleEditItem = () => {
        dispatch(fetchItem(props.data))
    }

    return (
        <li className="cursor-default scale-95 hover:scale-100
        transition-transform duration-200 transform">
            <div className="w-full relative flex flex-row bg-right-top bg-no-repeat px-4 py-2 rounded-lg shadow-sm shadow-black
            bg-slate-50
           "
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {/* info */}
                <div className={`gap-1 flex flex-col w-full 
                    ${isHovered ? "scale-x-95" : "scalse-x-100"}
                    ${isDone ? 'bg-right-top bg-no-repeat bg-passed-bg bg-rota bg-[length:50px]' : ''}
                    
                    delay-300
                    transition-all duration-500 ease-in-out transform origin-left`}>
                    <div className={`w-max p-1 ml-2 border-white border-2 shadow-sm shadow-black bg-${typeName(difficult)}-bg
                        rounded-md`}>
                        <h3 className={`text-sm col-span-3 self-center text-white font-extrabold`}>{difficult}</h3>
                    </div>

                    <div className="grid grid-cols-4 m-0 p-0">
                        <h3 className="text-2xl font-bold col-span-3 self-center pl-2 overflow-hidden whitespace-nowrap">{title}</h3>
                        <h6 className="text-sm italic text-opacity-80 font-thin w-full text-right self-center col-span-1">{dateMessage()}</h6>
                    </div>
                    <hr className="col-span-2 h-px" />
                    <h5 className="text-sm font-thin overflow-hidden row-span-1 col-span-2 self-center text-left pl-2 w-full">{desc}</h5>
                </div>

                {/* pop up */}
                <div className={`absolute grid grid-rows-2 right-0 top-0 bottom-0 justify-around rounded-tr-lg rounded-br-lg origin-right ${isHovered ? 'scale-x-100 visible' : 'scale-x-0'}
                transition-all duration-500 ease-in-out transform delay-300
                `}>
                    <button className={`w-auto rounded-tr-lg px-3
                    bg-warning-bg row-span-1
                    transition-all duration-500 ease-in-out transform
                    border-2 border-slate-200 hover:border-transparent`}
                        onMouseOver={() => setIsEditHovered(true)}
                        onMouseLeave={() => setIsEditHovered(false)}
                        onClick={handleEditItem}>
                        <FaMarker className={`size-4 ${isEditHovered ? 'text-black' : 'text-white'}`} />
                    </button>

                    <button className={`rounded-br-lg hover:ab px-3 origin-center  row-span-1 
                    ${isDone ? "scale-90 bg-red-800 hover:border-black" : 'scale-100 bg-warning-bg hover:border-transparent'}
                    transition-all duration-500 ease-in-out transform
                    border-2`}
                        onMouseOver={() => setIsCheckHovered(true)}
                        onMouseLeave={() => setIsCheckHovered(false)}
                        onClick={() => {
                            isDone
                                ? handleDelete()
                                : handleUpdate()
                        }}>
                        {isDone
                            ? <FaRegTrashAlt className={`size-4 ${isCheckHovered ? 'text-black' : 'text-white'}`} />
                            : <FaCheckDouble className={`size-4 ${isCheckHovered ? 'text-black' : 'text-white'}`} />}
                    </button>
                </div>
            </div>

        </li >)
}

export default ListItem;