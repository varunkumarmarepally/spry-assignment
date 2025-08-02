import { useEffect, useState } from 'react'
import styles from './styles.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../../reducers/todoSlice';
import { closeDialog } from '../../reducers/uiSlice';

const defaultTask = {
    name: '',
    desc: '',
    status: 'PENDING',
    dueDate: ''
}

const TaskForm = () => {

    const uiState = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const [task, setTask] = useState({...defaultTask, ...uiState.currentEditTask});

    const onUpdateOfForm = (payload) => {
        setTask((prev) => {
            return {
                ...prev,
                ...payload
            }
        });
    }

    const onClickAddTask = () => {
        console.log(task);
        dispatch(addTodo({
            ...task,
            id: Date.now()
        }));
        dispatch(closeDialog());
    }

    const onClickUpdateTask = () => {
        console.log(task);
        dispatch(updateTodo({
            ...task
        }));
        dispatch(closeDialog());
    }

    return (
        <>
            {/* Task Name */}
            <label className={styles.formLabel}>
                Task Name
                <span className={styles.required}>(required)</span>
            </label>
            <input
                value={task.name}
                className={styles.inputTaskName}
                type='text'
                placeholder='Enter Task Name'
                onChange={(e) => { onUpdateOfForm({name: e.target.value})}}
            />

            {/* Task Description */}
            <label className={styles.formLabel}>Task Description</label>
            <textarea
                value={task.desc}
                className={styles.inputTaskDesc}
                rows={3}
                onChange={(e) => { onUpdateOfForm({desc: e.target.value})}}
            />

            {/* Task Status */}
            <label className={styles.formLabel}>Status</label>
            <select
                value={task.status}
                className={styles.inputTaskStatus}
                onChange={(e) => { onUpdateOfForm({status: e.target.value})}}
            >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>

            {/* Task Due Date */}
            <label className={styles.formLabel}>
                Due Date
                <span className={styles.required}>(required)</span>
            </label>
            <input
                value={task.dueDate}
                className={styles.inputTaskDueDate}
                type="date"
                onChange={(e) => { onUpdateOfForm({dueDate: e.target.value})}}
            />
            <div className={styles.buttonContainer}>
                {/* <button className={styles.formButton}>CLEAR</button> */}
                {
                    uiState.dialogComponent == 'ADD_TODO'
                    ? <button className={styles.formButton} onClick={onClickAddTask} >ADD TASK</button>
                    : null
                }
                {
                    uiState.dialogComponent == 'EDIT_TODO'
                    ? <button className={styles.formButton} onClick={onClickUpdateTask} >UPDATE TASK</button>
                    : null
                }
            </div>
        </>
    );
}

export default TaskForm