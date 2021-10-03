import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './components/TodoList';
import InputField from './components/InputField';
import { addNewTodo, fetchTodo } from './store/todoSlice';

function App() {
  const [text, setText] = useState('');
  const {status, error} = useSelector(state => state.todo)
  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addNewTodo(text))
    setText('');
  };

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch])


  return (
    <div>
     <InputField text={text} handleInput={setText} handleSubmit={addTask} />
     {status === 'loading' && <h2>Loading</h2>}
     {error && <h2>An error occurred: {error}</h2>}
     <TodoList />
    </div>
  );
}

export default App;
