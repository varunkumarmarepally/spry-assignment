import styles from './styles.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { closeDialog } from '../../reducers/uiSlice'

import TaskForm from '../taskForm'

const DialogComponent = () => {

    const dispatch = useDispatch();
    const uiState = useSelector((state) => state.ui);

    const getDialogHeading = () => {
        console.log(uiState)
        switch (uiState.dialogComponent) {
            case 'ADD_TODO':
                return 'Add Task Popup';
            case 'EDIT_TODO':
                return 'Edit Task Popup'
            default:
                return '';
        }
    }

    const onClickCloseDialog = () => {
        dispatch(closeDialog())
    }

    return (
        <div className={styles.dialogModal}>
            <div className={styles.dialogContainer}>
                <div className={styles.dialogHeader}>
                    <div className={styles.heading}>{getDialogHeading()}</div>
                    <div className={styles.dialogClose} onClick={onClickCloseDialog}>
                        <svg width="100%" height="100%" viewBox="0 0 20 20">
                            <g transform="translate(-6 -6)">
                                <path className={styles.close} d="M18.695,16l6.752-6.752a1.886,1.886,0,0,0,0-2.668l-.027-.027a1.886,1.886,0,0,0-2.668,0L16,13.305,9.248,6.553a1.886,1.886,0,0,0-2.668,0l-.027.027a1.886,1.886,0,0,0,0,2.668L13.305,16,6.553,22.752a1.886,1.886,0,0,0,0,2.668l.027.027a1.886,1.886,0,0,0,2.668,0L16,18.695l6.752,6.752a1.886,1.886,0,0,0,2.668,0l.027-.027a1.886,1.886,0,0,0,0-2.668Z" fill="#040505"></path>
                            </g>
                        </svg>
                    </div>
                </div>
                <div className={styles.dialogContent}>
                    <TaskForm />
                </div>
            </div>
        </div>
    );
}

export default DialogComponent;