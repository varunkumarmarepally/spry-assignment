import ThemeToggler from '../themeToggler';
import styles from './styles.module.css';
import Logo from '../svgComponents/logo';

const Header = () => {

    

    return <div className={styles.headerContainer}>
        <Logo size="35" />
        <div className={styles.appName}>TASK MANAGER</div>
        <ThemeToggler />
        
    </div>
}

export default Header