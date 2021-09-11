import styles from '../../../styles/components/Forms.module.scss'
import { LoginForm } from '../../components/LoginForm'

const Login = () => {
  return (
    <div className={`${styles.container} flex column mainCenter crossCenter`}>
      <LoginForm />
    </div>
  )
}

export default Login