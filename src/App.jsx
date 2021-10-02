import './App.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { addTodo } from './store/todoSlice';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodo({text}))
    setText('');
  };


  return (
    <div>
     <InputField text={text} handleInput={setText} handleSubmit={addTask} />
     <TodoList />
    </div>
  );
}

export default App;
