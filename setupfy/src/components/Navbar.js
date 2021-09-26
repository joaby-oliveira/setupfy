import Logo from '../../public/setupfy.svg'
import styles from '../../styles/components/Navbar.module.scss'
import Link from 'next/link'
import Searchbar from './Searchbar'
import { useState } from 'react'
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false)
  return (
    <nav className={`${styles.navbar} flex crossCenter spaceBetween`}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
            <Logo />
          </div>
        </a>
      </Link>
      <Searchbar />
      <div className={`${styles.icons} flex crossCenter`}>
        {isLogged && (
          <div>
            <img src="https://avatars.githubusercontent.com/u/55921991?v=4" alt="Perfil" />
          </div>
        )}
        {!isLogged && (
          <div>
            <Link href="login"><a>Fazer login</a></Link>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar
