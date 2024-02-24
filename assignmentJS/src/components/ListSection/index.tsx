import { useEffect, useState } from "react";
import { api } from "../../api/client";
import ListItem from "./ListItem";

const ListSection = () => {

    const [datas, setDatas] = useState<any[] | null>(null)
    const fetchList = async () => {
        const res = await api.HandleRequest('/todo', 'get');
        console.log(res);
        if (res.status == 200) {
            console.log(res.data.length);
            setDatas(res.data)
        }
    }

    useEffect(() => {
        console.log("Render list");

        fetchList()
    }, [])

    useEffect(() => {
        console.log(datas);

    }, [datas])

    const renderList = datas && datas.length > 0
        ? datas
            .map((item: any) => <ListItem key={item._id} data={item} />)
        : null

    return (
        <>
            <ul className="overflow-x-auto flex flex-col gap-2 p-2 overflow-y-scroll max-h-80 bg-transparent">
                {renderList}
            </ul>
        </>
    )
}

export default ListSection;