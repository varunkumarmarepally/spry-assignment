import styles from './styles.module.css'

const Add = ({size}) => {
    return (
            <div style={{width: `${size}px`, height: `${size}px`}}>
                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
                    <path className={styles.add} d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="2" strokeLinecap="round"/>
                    <path className={styles.add} d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        );
}

export default Add