import React from "react";
import { useDispatch } from "react-redux";
import { removeTodo, toggleTodoComplete } from "../store/todoSlice";

const TodoItem = ({id, text, completed}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <input 
            type="checkbox" 
            checked={completed} 
            onChange={() => dispatch(toggleTodoComplete({id}))}
            />
            <span>{text}</span>
            <span onClick={() => dispatch(removeTodo({id}))}>&times;</span>
        </div>
    )
}

export default TodoItem;