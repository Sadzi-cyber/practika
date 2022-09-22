import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.wrapper}>
            <div className="container">
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Заметки
                    </h1>  
                </div>
            </div>
        </header>
    )
}

export default Header;