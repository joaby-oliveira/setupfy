import styles from '../../styles/components/Forms.module.scss'
import { Input } from './Input'
import { Button } from './Button'
import { useEffect } from 'react'

export const LoginForm = () => {
  useEffect(() => {

  }, [])

  return (
    <form className={styles.form}>
      <Input label="Nome de usuário" name="username" />
      <span className={styles.error}>
        Erro
      </span>
      <Button>Criar conta</Button>
    </form>
  )
}
