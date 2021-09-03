import styles from '../../styles/components/Forms.module.scss'
import { Login } from '../components/Login'
import { Register } from '../components/Register'

const Signin = () => {
  return (
    <div className={`${styles.container} flex mainCenter crossCenter`}>
      <Login />
      <Register />
    </div>
  )
}

export default Signin
