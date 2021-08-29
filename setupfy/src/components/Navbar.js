import { Home, MessageSquare } from 'react-feather'
import Logo from '../../public/setupfy.svg'
import styles from '../../styles/components/Navbar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className={`${styles.navbar} flex crossCenter spaceBetween`}>
      <Link href="/">
        <a>
          <div className={styles.logo}>
            <Logo />
          </div>
        </a>
      </Link>
      <div className={`${styles.icons} flex crossCenter`}>
        <Home className="icon" />
        <MessageSquare className="icon" />
        <div>
          <img src="https://avatars.githubusercontent.com/u/55921991?v=4" alt="Perfil" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
