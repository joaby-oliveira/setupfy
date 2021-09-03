import { useState } from 'react'
import styles from '../../styles/components/Forms.module.scss'
import { Login } from '../components/Login'
import { Register } from '../components/Register'

const Signin = () => {
  const [loginShown, setLoginShown] = useState(true)
  return (
    <div className={`${styles.container} flex column mainCenter crossCenter`}>
      {loginShown && <Login />}
      {!loginShown && <Register />}
      <div className={styles.formBottom}>
        <span>
          {loginShown ? 'Já' : 'Ainda não'} tem uma conta?
          <span
            className={styles.signLink}
            onClick={() => { setLoginShown(!loginShown) }}
          >
            {loginShown ? 'Criar conta' : 'Entrar'}
          </span>
        </span>
      </div>
    </div>
  )
}

export default Signin
