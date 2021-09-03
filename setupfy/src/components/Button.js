import styles from '../../styles/components/Button.module.scss'

export const Button = ({children}) => {
  return (
    <button className={styles.button}>
      {children}
    </button>
  )
}
