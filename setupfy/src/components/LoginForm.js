import styles from '../../styles/components/Forms.module.scss'
import { Input } from './Input'
import { Button } from './Button'
import { useForm } from '../Hooks/useForm'
import Logo from '../../public/setupfy.svg'

export const LoginForm = () => {
  const username = useForm('username')
  const password = useForm('password')

  return (
    <form className={`${styles.form} flex column crossCenter`}>
      <Logo className={styles.logo}/>
      <Input label="Nome de usuário" name="username" {...username}/>
      <Input label="Senha" name="password" {...password}/>
      <Button>Criar conta</Button>
    </form>
  )
}
