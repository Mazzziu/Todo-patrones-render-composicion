import React from "react";
// import './App.css';

//context
import { TodoContext } from "../contexts/todoContext";

//componentes
import { Header } from "../components/Header";
import { TodoCounter } from "../components/TodoCounter";
import { TodoSearch } from "../components/TodoSearch";
import { TodoList } from "../components/TodoList";
import { TodoItem } from "../components/TodoItem";
import { TodoSkeleton } from "../components/TodoSkeleton";
import { CreateTodoButton } from "../components/CreateTodoButton";
import { Modal } from "../components/Modal";
import { TodoForm } from "../components/TodoForm";
import { TodoMessage } from "../components/TodoMessage";

const AppUI = () => {
    const { error, loading, findTodo, todos, finishTodo, deleteTodo, search } =
        React.useContext(TodoContext);

    return (
        <React.Fragment>
            <Header />
            <TodoCounter />
            <TodoSearch />

            {error && (
                <TodoMessage
                    icon={<i className='fa-solid fa-bomb icon' />}
                    message='Ups... algo salio mal al cargar los TODOs'
                />
            )}

            {loading && <TodoSkeleton />}

            {!loading && todos.length < 1 && search.length < 1 && (
                <TodoMessage
                    icon={<i className='fa-solid fa-feather-pointed' />}
                    message='Es momento de organizar tu día!'
                />
            )}

            {!loading && findTodo.length < 1 && search.length > 1 && (
                <TodoMessage
                    icon={<i className='fa-regular fa-face-rolling-eyes' />}
                    message='No existe este todo aun...'
                />
            )}

            <TodoList>
                {!loading &&
                    findTodo.map((todo, id) => (
                        <TodoItem
                            key={todo.text}
                            text={todo.text}
                            completed={todo.completed}
                            finishTodo={() => finishTodo(id)}
                            deleteTodo={() => deleteTodo(id)}
                        />
                    ))}
            </TodoList>

            <CreateTodoButton />
            <Modal>
                <TodoForm />
            </Modal>
        </React.Fragment>
    );
};

export { AppUI };
