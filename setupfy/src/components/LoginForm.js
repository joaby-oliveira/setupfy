import styles from '../../styles/components/Forms.module.scss'
import { Input } from './Input'
import { Button } from './Button'
import { useForm } from '../Hooks/useForm'

export const LoginForm = () => {
  const username = useForm()

  return (
    <form className={styles.form}>
      <Input label="Nome de usuário" name="username" {...username}/>
      <span className={styles.error}>
        Erro
      </span>
      <Button>Criar conta</Button>
    </form>
  )
}
