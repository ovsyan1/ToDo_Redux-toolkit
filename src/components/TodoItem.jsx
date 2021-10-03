import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";

const TodoItem = ({id, title, completed}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span onClick={() => dispatch(deleteTodo(id))}>&times;</span>
        </div>
    )
}

export default TodoItem;