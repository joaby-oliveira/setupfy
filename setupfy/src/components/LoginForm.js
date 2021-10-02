import Link from 'next/link'
import styles from '../../styles/components/Forms.module.scss'
import { Input } from './Input'
import { Button } from './Button'
import { useForm } from '../Hooks/useForm'
import Logo from '../../public/setupfy.svg'

export const LoginForm = () => {
  const username = useForm('username')
  const password = useForm('password')

  return (
    <div>
      <form className={`${styles.form} flex column`}>
        <Logo className={styles.logo} />
        <Input label="Nome de usuário" name="username" required={true} {...username} />
        <Input label="Senha" name="password" type="password" {...password} />
        <Link href="esqueci-minha-senha">
          <a className={`${styles.forgotPass}`}>Esqueci minha senha</a>
        </Link>
        <Button>Entrar</Button>
      </form>
      <div className={`${styles.formBottom}`}>
        <p>Ou</p>
        <Link href="criar-conta">
          <a className={styles.signLink}>
            Criar uma conta
          </a>
        </Link>
      </div>
    </div>
  )
}
