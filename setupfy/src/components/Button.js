import styles from '../../styles/components/Button.module.scss'

export const Button = ({children, ...props}) => {
  return (
    <button {...props} className={`${styles.button} flex crossCenter mainCenter`}>
      {children}
    </button>
  )
}
