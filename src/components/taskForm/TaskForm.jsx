import { useState, useEffect } from 'react'
import styles from './styles.module.css'

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../../reducers/todoSlice';
import { closeDialog } from '../../reducers/uiSlice';
import { postTodo, putTodo } from '../../utils/indexDBUtil';

const defaultTask = {
    name: '',
    desc: '',
    status: 'PENDING',
    dueDate: ''
}

const buttonText = {
    'ADD_TODO': 'ADD TASK',
    'EDIT_TODO': 'UPDATE TASK'
}

const TaskForm = () => {

    const uiState = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const [task, setTask] = useState({...defaultTask, ...uiState.currentEditTask});
    const [disableSave, setDisableSave] = useState(true);

    useEffect(() => {
        if(task.name.trim() !== '' && task.dueDate != '') {
            setDisableSave(false);
        } else {
            setDisableSave(true);
        }
    }, [task])

    const onUpdateOfForm = (payload) => {
        setTask((prev) => {
            return {
                ...prev,
                ...payload
            }
        });
    }

    const onClickSubmitTask = () => {
        if(uiState.dialogComponent == 'ADD_TODO') {
            const updatedTask = {
                ...task,
                id: Date.now()
            };
            postTodo(updatedTask)
            dispatch(addTodo(updatedTask));
        } else if (uiState.dialogComponent == 'EDIT_TODO') {
            putTodo(task);
            dispatch(updateTodo({
                ...task
            }));
        }
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
            {
                task.name.trim() == ''
                ? <span className={styles.formError}>Fill Task name to add a task</span>
                : null
            }

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
            {
                task.dueDate.trim() == ''
                ? <span className={styles.formError}>Provide due date to add a task</span>
                : null
            }

            <div className={styles.buttonContainer}>
                <button disabled={disableSave} className={disableSave ? styles.formButtonDisabled : styles.formButton} onClick={onClickSubmitTask} >
                    {buttonText[uiState.dialogComponent]}
                </button>
            </div>
        </>
    );
}

export default TaskForm