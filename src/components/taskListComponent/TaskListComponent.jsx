import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { updateUiState } from '../../reducers/uiSlice';
import TaskCard from '../taskCard';
import { useEffect, useMemo } from 'react';

const TaskListComponent = ({filter}) => {
    const dispatch = useDispatch();
    const storeTodos = useSelector((state) => state.todos);
    const currentSortFilter = useSelector((state) => state.ui.currentSortFilter);

    useEffect(() => {
        dispatch(updateUiState({currentTaskFilter: filter}))
    }, [filter]);

    const sortTodosBasedOnFilter = (todos) => {
        if(currentSortFilter == 'DUE_DATE') {
            todos.sort((a, b) => {
                return new Date(a.dueDate) - new Date(b.dueDate);
            });
        } else if (currentSortFilter == 'ABC') {
            todos.sort((a, b) => {
                return a.name > b.name ? 1 : -1;
            });
        } else if (currentSortFilter == 'ABC_REVERSE') {
            todos.sort((a, b) => {
                return b.name > a.name ? 1 : -1;
            });
        }
    }

    const getAllTasksList = (todos) => {
        if(filter != 'ALL_TASKS') {
            todos = todos.filter((eachTodo) => {
                return eachTodo.status == filter;
            })
        }
        sortTodosBasedOnFilter(todos);
        const todoDivs = todos.map((eachTodo) => {
            return <TaskCard key={eachTodo.id} task={eachTodo} />;
        });
        return todoDivs;
    }

    const taskList = useMemo(() => getAllTasksList([...storeTodos]), [storeTodos, currentSortFilter, filter])

    return <div className={styles.taskListContainer}>
        {taskList.length > 0 ? taskList : 'No tasks avalable for selected criteria'}
    </div>
}

export default TaskListComponent