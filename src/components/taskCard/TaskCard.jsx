import styles from './styles.module.css'

import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../reducers/todoSlice';
import { openDialog } from '../../reducers/uiSlice';

const TaskCard = ({task}) => {
    const dispatch = useDispatch();

    const onCickEditTask = () => {
        dispatch(openDialog({dialogComponent: 'EDIT_TODO', currentEditTask: {...task}}))
    }

    const onClickDeleteTask = () => {
        dispatch(deleteTodo(task));
    }

    return (
        <div className={styles.taskCardContainer}>
            <div className={styles.taskDetailsContainer}>
                <div className={styles.taskName}>{task.name}</div>
                <div className={styles.taskDesc}>{task.desc}</div>
            </div>
            <div className={styles.statusContainer}>{task.status}</div>
            <div className={styles.taskToolsContainer}>
                <div className={styles.taskCardButton} onClick={onCickEditTask}>EDIT</div>
                <div className={styles.taskCardButton} onClick={onClickDeleteTask}>DELETE</div>
            </div>
        </div>
    );
}

export default TaskCard