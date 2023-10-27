import styles from './Header.module.scss'

const Header = () => {
  return (
    <header>
        <div className="container">
          <nav>
            <h1 className={styles.logo}>myCV</h1>
            <button>Log in</button>
          </nav>
        </div>
    </header>
  )
}

export default Header;