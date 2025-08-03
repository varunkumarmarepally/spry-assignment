import { Outlet } from 'react-router'
import styles from './styles.module.css'
import Footer from '../footer'
import Header from '../header'
import ToolsComponent from '../toolsComponent'
import DialogComponent from '../dialogComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllTodos } from '../../utils/indexDBUtil'
import { setInitialTodos } from '../../reducers/todoSlice';

const BaseComponent = () => {

    const [postDBDataFlag, setPostDBDataFlag] = useState(false);

    const dispatch = useDispatch();
    const uiState = useSelector((state) => state.ui);

    const getDBData = (data) => {
        dispatch(setInitialTodos(data));
        console.log(data);
        
    }

    useEffect(() => {
        console.log("I am here")
        if(!postDBDataFlag) {
            getAllTodos(getDBData)
        }
        setPostDBDataFlag(true);
    }, [postDBDataFlag])

    return (
        <>
            <Header></Header>
            <div className={styles.contentContainer}>
                <ToolsComponent />
                <Outlet />
            </div>
            <Footer />
            {
                uiState.isDialogOpen
                ? <DialogComponent />
                : null
            }
        </>
    );
}

export default BaseComponent