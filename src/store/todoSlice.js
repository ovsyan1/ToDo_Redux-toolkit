import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk(
    'todo/fetchTodo',
    async function(_, {rejectWithValue}){
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if(!response.ok){
                throw new Error('Server Error');
            }
            const data = await response.json();
            return data
        }catch(error){
            throw rejectWithValue(error.message);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async function(id, {rejectWithValue, dispatch}){
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE',
            })
            console.log(response);
            if(!response.ok){
                throw new Error('Can\'t delete task. Server error');
            }

            dispatch(removeTodo({id}))
        }catch(error){
            throw rejectWithValue(error.message);
        }
    }
)

export const toggleStatus = createAsyncThunk(
    'todo/toggleStatus',
    async function(id, {rejectWithValue, dispatch, getState}){
        const todo = getState().todo.todo.find(todo => todo.id === id);
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            })
            if(!response.ok){
                throw new Error('Can\'t toggle status. Server error');
            }
           dispatch(toggleTodoComplete({id}))
        }catch(error){
            throw rejectWithValue(error.message);
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todo/addNewTodo',
    async function (text, {rejectWithValue, dispatch}) {
        try{
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            })
            if(!response.ok){
                throw new Error('Can\'t add task. Server error');
            }
            const data = await response.json()
            dispatch(addTodo(data));
        }catch(error){
            throw rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todo: [],
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            console.log(state);
            console.log(action);

            state.todo.push(action.payload)
        },
        removeTodo(state, action) {
            state.todo = state.todo.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodoComplete(state, action) {
            const toggledTodo = state.todo.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed; 
        },
    },
    extraReducers: {
        [fetchTodo.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodo.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todo = action.payload;
        },
        [fetchTodo.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    }
});

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;