import { useState } from "react"
import { FaCheckDouble, FaMarker } from "react-icons/fa6"

type ListItemProps = {
    data: {
        title: string,
        difficult: string,
        desc: string
    }
    createAt?: Date,
}

const ListItem = (props: ListItemProps) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isEditHovered, setIsEditHovered] = useState(false);
    const [isCheckHovered, setIsCheckHovered] = useState(false);
    const typeName = (type: string) => {
        switch (type) {
            case "Easy": return "safe"
            case "Medium": return "warning"
            default: return "danger"
        }
    }
    const { title, difficult, desc } = props.data
    console.log("Item:", props.data);


    return (
        <li className="cursor-default scale-95 hover:scale-100
        transition-transform duration-200 transform">
            <div className=" w-full relative flex flex-row bg-submit bg-opacity-40 px-4 py-2 rounded-lg shadow-sm shadow-black"
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className={`gap-1 flex flex-col w-full 
             ${isHovered ? "scale-x-95" : "scalse-x-100"}
             delay-300
            transition-all duration-500 ease-in-out transform origin-left`}>
                    <div className={`w-max p-1 ml-2 border-white border-2 shadow-sm shadow-black bg-${typeName(difficult)}-bg
                rounded-md`}>
                        <h3 className={`text-sm col-span-3 self-center text-white font-extrabold`}>{difficult}</h3>
                    </div>

                    <div className="grid grid-cols-4 m-0 p-0">
                        <h3 className="text-2xl font-bold col-span-3 self-center pl-2 overflow-hidden whitespace-nowrap">{title}</h3>
                        <h6 className="text-sm italic text-opacity-80 font-thin w-full text-right self-center col-span-1">24/02/2024</h6>
                    </div>
                    <hr className="col-span-2 h-px" />
                    <h5 className="text-sm font-thin overflow-hidden row-span-1 col-span-2 self-center text-left pl-2 w-full">{desc}</h5>
                </div>

                <div className={`absolute grid grid-rows-2 right-0 top-0 bottom-0 justify-around bg-warning bg-opacity-50 rounded-tr-lg rounded-br-lg origin-right ${isHovered ? 'scale-x-100 visible' : 'scale-x-0'}
                transition-all duration-500 ease-in-out transform delay-300
                `}>
                    <button className=" w-auto rounded-tr-lg hover:bg-error px-3
                    transition-all duration-500 ease-in-out transform
                    border-2 border-slate-200 hover:border-transparent"
                        onMouseOver={() => setIsEditHovered(true)}
                        onMouseLeave={() => setIsEditHovered(false)}>
                        <FaMarker className={`size-4 ${isEditHovered ? 'text-black' : 'text-white'}`} />
                    </button>

                    <button className="rounded-br-lg hover:bg-submit px-3
                    transition-all duration-500 ease-in-out transform
                    border-2 border-slate-200 hover:border-transparent"
                        onMouseOver={() => setIsCheckHovered(true)}
                        onMouseLeave={() => setIsCheckHovered(false)}>
                        <FaCheckDouble className={`size-4 ${isCheckHovered ? 'text-black' : 'text-white'}`} />
                    </button>
                </div>
            </div>

        </li>)
}

export default ListItem;