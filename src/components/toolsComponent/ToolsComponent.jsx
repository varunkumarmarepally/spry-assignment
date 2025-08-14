import styles from './styles.module.css'
import appConfig from '../../utils/appConfig'
import { NavLink, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { openDialog, updateUiState } from '../../reducers/uiSlice';
import { useMemo, useState } from 'react';
import Add from '../svgComponents/add';


const ToolsComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentTaskFilter = useSelector((state) => state.ui.currentTaskFilter);
    const currentSortFilter = useSelector((state) => state.ui.currentSortFilter);
    const todos = useSelector((state) => state.todos);

    const [searchText, setSearchText] = useState('')

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

    const onUpdateOfStatus = (event) => {
        let value = event.target.value;
        dispatch(updateUiState({currentTaskFilter: value}));
        navigate(`/tasks/${value.toLowerCase()}`);
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

    const getAllTaskFiltersAsSelect = () => {
        const taskFilters = appConfig.statusTypes.map((eachFilter) => {
            return (
                <option
                    key={eachFilter.statusId}
                    value={eachFilter.statusId}
                    // className={styles.taskFilter}
                    // to={`/tasks/${eachFilter.statusId.toLowerCase()}`} end
                >
                    {eachFilter.name}
                    {/* <span className={currentTaskFilter == eachFilter.statusId ? styles.todoCountActive : styles.todoCount}> */}
                        {/* {getTodoCount(eachFilter.statusId)} */}
                    {/* </span> */}
                    &nbsp;({taskCounts[eachFilter.statusId]})
                </option>
            );
        });
        return (
            <select
                value={currentTaskFilter}
                className={styles.selectTaskStatus}
                onChange={onUpdateOfStatus}
            >
                {/* <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option> */}
                {taskFilters}
            </select>
        );
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

    const onChangeOfSearchText = (e) => {
        setSearchText(e.target.value);
        dispatch(updateUiState({
            currentSearchFilter: e.target.value
        }));
    }

    return (
        <div className={styles.toolsContainer}>
            <div className={styles.taskToolContainer}>
                <div className={styles.taskFilterContainer}>
                    {getAllTaskFilters()}
                    {getAllTaskFiltersAsSelect()}
                    <input type="text" placeholder='Search Text' value={searchText} onChange={onChangeOfSearchText} />
                </div>
                <div className={styles.taskContainer}>
                    <div className={styles.task} onClick={onClickAddTask}>
                        <Add size={22} /><span>Add Task</span>
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