import styles from './styles.module.css'

const Footer = () => {
    const year = new Date(Date.now()).getFullYear();
    return (
        <footer className={styles.footer}>
            © {year}, All rights reserved.
        </footer>
    );
}

export default Footer