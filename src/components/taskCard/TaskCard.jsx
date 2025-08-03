import styles from './styles.module.css'

import { useDispatch } from 'react-redux';
import { removeTodo } from '../../reducers/todoSlice';
import { openDialog } from '../../reducers/uiSlice';
import { deleteTodo } from '../../utils/indexDBUtil';
import Edit from '../svgComponents/edit';
import Delete from '../svgComponents/delete';

const statusText = {
    PENDING: 'Pending',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed'
}

const TaskCard = ({task}) => {
    const dispatch = useDispatch();

    const onCickEditTask = () => {
        dispatch(openDialog({dialogComponent: 'EDIT_TODO', currentEditTask: {...task}}))
    }

    const onClickDeleteTask = () => {
        deleteTodo(task);
        dispatch(removeTodo(task));
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return styles.statusPending;
            case 'IN_PROGRESS':
                return styles.statusInProgress;
            case 'COMPLETED':
                return styles.statusCompleted;
            default:
                break;
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return styles.statusPending;
            case 'IN_PROGRESS':
                return styles.statusInProgress;
            case 'COMPLETED':
                return styles.statusCompleted;
            default:
                break;
        }
    }

    return (
        <div className={styles.taskCardContainer}>
            <div className={styles.taskDetailsContainer}>
                <div className={styles.taskName}>{task.name}</div>
                <div className={styles.taskDesc}>{task.desc}</div>
            </div>
            <div className={styles.taskDueDate}><span>Due by </span>{task.dueDate}</div>
            <div className={styles.statusContainer}>
                <span className={getStatusClass(task.status)}><label>{statusText[task.status]}</label></span>
            </div>
            <div className={styles.taskToolsContainer}>
                <div className={styles.taskCardButton} onClick={onCickEditTask}>
                    <Edit size={20} /><span>EDIT</span>
                </div>
                <div className={styles.taskCardButton} onClick={onClickDeleteTask}>
                    <Delete size={20} /><span>DELETE</span>
                </div>
            </div>
        </div>
    );
}

export default TaskCard