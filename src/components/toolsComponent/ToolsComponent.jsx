import styles from './styles.module.css'
import appConfig from '../../utils/appConfig'
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, updateUiState } from '../../reducers/uiSlice';
import { useMemo } from 'react';


const ToolsComponent = () => {

    const dispatch = useDispatch();
    const currentTaskFilter = useSelector((state) => state.ui.currentTaskFilter);
    const currentSortFilter = useSelector((state) => state.ui.currentSortFilter);
    const todos = useSelector((state) => state.todos);

    const getTodoCount = (status) => {
        if(status == 'ALL_TASKS') {
            return todos.length;
        }
        return todos.reduce((count, eachTodo) => {
            return eachTodo.status == status ? count + 1 : count
        }, 0);
    }

    const taskCounts = {
        ALL_TASKS: useMemo(() => getTodoCount('ALL_TASKS'), [todos]),
        PENDING: useMemo(() => getTodoCount('PENDING'), [todos]),
        IN_PROGRESS: useMemo(() => getTodoCount('IN_PROGRESS'), [todos]),
        COMPLETED: useMemo(() => getTodoCount('COMPLETED'), [todos])
    }

    const getAllTaskFilters = () => {
        const taskFilters = appConfig.statusTypes.map((eachFilter) => {

            return (
                <NavLink
                    key={eachFilter.statusId}
                    className={currentTaskFilter == eachFilter.statusId ? styles.taskFilterActive : styles.taskFilter}
                    to={`/tasks/${eachFilter.statusId.toLowerCase()}`} end
                >
                    {eachFilter.name}
                    <span className={currentTaskFilter == eachFilter.statusId ? styles.todoCountActive : styles.todoCount}>
                        {/* {getTodoCount(eachFilter.statusId)} */}
                        {taskCounts[eachFilter.statusId]}
                    </span>
                </NavLink>
            );
        });
        return taskFilters;
    }

    const getAllSortFilters = () => {
        const sortFilters = appConfig.filterTypes.map((eachFilter) => {
            return (
                <div key={eachFilter.filterId}
                    className={currentSortFilter == eachFilter.filterId ? styles.sortFilterActive : styles.sortFilter}
                    onClick={() => {onClickSortFilter(eachFilter.filterId)}}
                >
                    {eachFilter.name}
                </div>
            );
        });
        return sortFilters;
    }

    const onClickAddTask = () => {
        dispatch(openDialog({dialogComponent: 'ADD_TODO'}))
    }

    const onClickSortFilter = (filterId) => {
        if(currentSortFilter == filterId) {
            dispatch(updateUiState({
                currentSortFilter: ''
            }))
        } else {
            dispatch(updateUiState({
                currentSortFilter: filterId
            }))
        }
    }

    return (
        <div className={styles.toolsContainer}>
            <div className={styles.taskToolContainer}>
                <div className={styles.taskFilterContainer}>
                    {getAllTaskFilters()}
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.task} onClick={onClickAddTask}>
                        Add Task
                    </div>
                </div>
            </div>
            <div className={styles.sortFilterContainer}>
                <span>Sort by:</span>
                {getAllSortFilters()}
            </div>
        </div>
    );
}

export default ToolsComponent