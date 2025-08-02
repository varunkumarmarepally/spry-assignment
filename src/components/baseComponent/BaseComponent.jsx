import { Outlet } from 'react-router'
import styles from './styles.module.css'
import Footer from '../footer'
import Header from '../header'
import ToolsComponent from '../toolsComponent'
import DialogComponent from '../dialogComponent'
import {useSelector} from 'react-redux'

const BaseComponent = () => {

    const uiState = useSelector((state) => state.ui);
    console.log(uiState);

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