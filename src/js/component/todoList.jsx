import React, { useState } from 'react'

const TodoList = () => {

    // Input to get Username
    // Input to get new Task
    // List to show All Todo List Tasks (All todos Consist of Delete Icon)

    const [username, setUsername] = useState('')
    const [todoList, setTodoList] = useState([])
    const [newTodo, setNewTodo] = useState('')

    const deleteUser = () => {
        if(username !== '') {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw Error(response.status)
            }).then(() => {
                setUsername('')
                setTodoList([])
                setNewTodo('')
                alert(' User is Deleted Now!')
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert('We can not DELETE Empty username!')
        }
    }

    const createUser = () => {
        if(username !== '') {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: 'POST',
                body: JSON.stringify([]),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchTodoList()
            }).catch(err => {
                console.log('Error', err);
            })
        } else {
            alert('Can not Create User for Empty Username!')
        }
    }

    const fetchTodoList = () => {
        // fetch todo List for User
        console.log(' Fetch To do List for', username);

        if(username !== '') {
            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                console.log(response);
                if(response.ok) {
                    return response.json()
                }
                if(response.status === 404) {
                    createUser();
                    return
                }
                throw Error(response.status)
            }).then((todoData) => {
                setTodoList(todoData);
            }).catch(err => {
                console.log(err);
            })
        } else {
            alert('Username can not be empty!')
        }
    }

    const addNewTodo = () => {
        console.log(' Add this New TO do Task to List', newTodo);

        if(username === '') {
            alert('Please add Username First!')
            return
        }


        if(newTodo !== '') {
            const newTodoList = [...todoList, { done: false, label: newTodo }]

            fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: 'PUT',
                body: JSON.stringify(newTodoList),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchTodoList();
                setNewTodo('')
            }).catch(err => {
                console.log('Error', err);
            })
        } else {
            alert('New Todo Task can not be empty!')
        }
    }

    const deleteTodo = (id) => {
        const updatedTodo = todoList.filter(todo => todo.id !== id)

        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
                method: 'PUT',
                body: JSON.stringify(updatedTodo),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => {
                if(response.ok) {
                    return response.json()
                }
                throw Error(response.status + "! Something Went Wrong")
            }).then(() => {
                fetchTodoList();
                setNewTodo('')
            }).catch(err => {
                console.log('Error', err);
            })
    }


    return (
        <div>
            <div style={{ margin: 10 }}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Enter your Username'
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                            // fetch todo List for that user...
                            fetchTodoList();
                        }
                    }}
                />
                <button onClick={deleteUser}>Delete User</button>
            </div>
                <div style={{ margin: 10 }}>
                    <input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder='Enter your New Task'
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                // fetch todo List for that user...
                                addNewTodo()
                            }
                        }}
                    />
                    <button onClick={addNewTodo}>Add</button>
                </div>

            <ul style={{ marginTop: 10 }}>
                {todoList !== undefined && todoList.map(todo => {
                    return (
                        <li key={todo.id}>
                            <input type='checkbox' checked={todo.done}></input>
                            {todo.label}
                            <i 
                                className="far fa-trash-alt" 
                                style={{ marginLeft: 5, cursor: 'pointer' }}
                                onClick={() => deleteTodo(todo.id)}
                            ></i>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default TodoList