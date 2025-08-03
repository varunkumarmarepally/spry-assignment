import {useEffect, useState} from 'react'
import styles from './styles.module.css'

const ThemeToggler = () => {
    const [theme, setTheme] = useState('LIGHT');
    const rootElement = document.getElementById('root');

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('DARK');
        } else {
            setTheme('LIGHT');
        }
    }, []);

    useEffect(() => {
        if(theme == 'DARK') {
            rootElement.classList.replace('light-theme', 'dark-theme')
        } else {
            rootElement.classList.replace('dark-theme', 'light-theme')
        }
    }, [theme]);

    const toggleTheme = () => {
        if(theme == 'LIGHT') {
            setTheme('DARK');
        } else {
            setTheme('LIGHT');
        }
       
    }

    return (
        <div className={styles.themeContainer} onClick={toggleTheme}>
            <div className={styles.themeImage}>
                <svg width="100%" height="100%" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <rect width="48" height="48" fill="none"></rect>
                        <g>
                            <path className={styles.line} d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z"></path>
                            <path className={styles.line} d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z"></path>
                        </g>
                    </g>
                </svg>
            </div>
            <div className={styles.themeText}>{theme == 'DARK'? 'LIGHT': 'DARK'}</div>
        </div>
    );
}

export default ThemeToggler