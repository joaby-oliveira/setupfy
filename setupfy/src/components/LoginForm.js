import styles from '../../styles/components/Forms.module.scss'
import { Input } from './Input'
import { Button } from './Button'
import { useForm } from '../Hooks/useForm'

export const LoginForm = () => {
  const username = useForm('username')
  const password = useForm('password')

  return (
    <form className={styles.form}>
      <Input label="Nome de usuário" name="username" {...username}/>
      <Input label="Senha" name="password" {...password}/>
      <Button>Criar conta</Button>
    </form>
  )
}
