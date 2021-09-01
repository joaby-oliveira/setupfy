import styles from '../../styles/components/Forms.module.scss'
import LoginBackground from '../../public/loginBackground.svg'
import Logo from '../../public/setupfy.svg'

const Login = () => {
  return (
    <div className={`${styles.container} flex mainCenter crossCenter`}>
      <LoginBackground />
      <form className={`${styles.form} flex column`}>
        <Logo />
      </form>
    </div>
  )
}

export default Login
