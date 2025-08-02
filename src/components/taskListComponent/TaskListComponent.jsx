import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUiState } from '../../reducers/uiSlice';
import TaskCard from '../taskCard';
import { useEffect } from 'react';

const TaskListComponent = ({filter}) => {
    const dispatch = useDispatch();
    const storeTodos = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(updateUiState({currentTaskFilter: filter}))
    }, [filter])

    console.log(storeTodos, filter);

    const getAllTasksList = () => {
        let todos;
        if(filter == 'ALL_TASKS') {
            todos = storeTodos;
        } else {
            todos = storeTodos.filter((eachTodo) => {
                return eachTodo.status == filter;
            })
        }
        const todoDivs = todos.map((eachTodo) => {
            return <TaskCard key={eachTodo.id} task={eachTodo} />;
        });
        return todoDivs;
    }

    return <div className={styles.taskListContainer}>
        {getAllTasksList()}
    </div>
}

export default TaskListComponent