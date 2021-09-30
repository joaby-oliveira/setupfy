import { useState } from 'react'
import styles from './styles.module.scss'
export const AddComment = () => {

  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if(comment !== '') {
      console.log('enviar dados para a api')
    }
  }

  return (
    <form onSubmit={handleSubmit} className={`${styles.addComment} flex crossCenter`}>
      <input
        placeholder="Faça seu comentario"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={`${comment !== '' ? styles.active : ''}`}>Comentar</button>
    </form>
  )
}
