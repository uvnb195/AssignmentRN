import { useEffect, useState } from "react";
import { api } from "../../api/client";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer";
import { fetchTodo } from "../../redux/action";

const ListSection = () => {
    const dispatch = useDispatch()
    const todoList = useSelector((state: RootState) => state.listTodo)

    const fetchList = async () => {
        const res = await api.HandleRequest('/todo', 'get');
        console.log(res);
        if (res.status == 200) {
            dispatch(fetchTodo(res.data))
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    useEffect(() => {
        console.log("List:", todoList);
    }, [todoList])

    const rvsArr = todoList && todoList.length > 0 ? [...todoList].reverse() : []

    const renderList = todoList && todoList.length > 0
        ? rvsArr
            .map((item: any) => {
                return (<ListItem key={item._id} data={item} />)
            })
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