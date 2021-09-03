import styles from '../../styles/components/Forms.module.scss'

import Logo from '../../public/setupfy.svg'
import React, { useRef, useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'react-feather'
import { Button } from './Button'

export const Register = () => {
  const [form, setForm] = useState({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const passwordInput = useRef()
  
  function handlePasswordVisibility() {
    if (isPasswordVisible) {
      passwordInput.current.type = "password"
      setIsPasswordVisible(false)
    } else {
      passwordInput.current.type = "text"
      setIsPasswordVisible(true)
    }
  }
  
  function handleChange({ target }) {
    const { id, value } = target
    setForm({ ...form, [id]: value })
  }
  return (
    <form className={`${styles.form} flex column crossCenter`}>
      <Logo />
      <div className={`${styles.inputBlock} flex column`}>
        <input
          id="username"
          type="text"
          value={form.username}
          onChange={handleChange}
        />
        <label
          className={`${form.username ? `${styles.onTopLabel}` : ''}`}
          htmlFor="username"
        >
          Nome de usuário
        </label>
      </div>
      <div className={`${styles.inputBlock} flex column`}>
        <input
          id="email"
          type="text"
          value={form.email}
          onChange={handleChange}
        />
        <label
          className={`${form.email ? `${styles.onTopLabel}` : ''}`}
          htmlFor="email"
        >
          E-mail
        </label>
      </div>
      <div className={styles.passwordVisibilityContainer}>
        <div className={`${styles.inputBlock} flex column`}>
          <input
            className={styles.input}
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder=""
            ref={passwordInput}
          />
          <label
            className={`${form.password ? `${styles.onTopLabel}` : ''}`}
            htmlFor="password"
          >
            Senha
          </label>
        </div>
        {isPasswordVisible && <EyeOff onClick={handlePasswordVisibility} />}
        {!isPasswordVisible && <Eye onClick={handlePasswordVisibility} />}
      </div>
      <Button>Criar Conta<ArrowRight strokeWidth={3} /></Button>
    </form>
  )
}
