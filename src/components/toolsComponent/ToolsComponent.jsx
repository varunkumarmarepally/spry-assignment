import styles from './styles.module.css'
import appConfig from '../../utils/appConfig'
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { openDialog } from '../../reducers/uiSlice';


const ToolsComponent = () => {

    const dispatch = useDispatch();
    const currentTaskFilter = useSelector((state) => state.ui.currentTaskFilter);
    const currentStatusFilter = useSelector((state) => state.ui.currentStatusFilter);
    const todos = useSelector((state) => state.todos);

    const getTodoCount = (status) => {
        console.log("inside", status, todos);
        if(status == 'ALL_TASKS') {
            return todos.length;
        }
        return todos.reduce((count, eachTodo) => {
            return eachTodo.status == status ? count + 1 : count
        }, 0);
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
                    <span>{getTodoCount(eachFilter.statusId)}</span>
                </NavLink>
            );
        });
        return taskFilters;
    }

    const getAllSortFilters = () => {
        const sortFilters = appConfig.filterTypes.map((eachFilter) => {
            return (
                <div key={eachFilter.filterId} className={styles.sortFilter}>
                    {eachFilter.name}
                </div>
            );
        });
        return sortFilters;
    }

    const onClickAddTask = () => {
        dispatch(openDialog({dialogComponent: 'ADD_TODO'}))
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
                {getAllSortFilters()}
            </div>
        </div>
    );
}

export default ToolsComponent