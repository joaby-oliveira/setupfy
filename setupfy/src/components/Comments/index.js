import Link from 'next/link'

import styles from './styles.module.scss'

import { useState } from "react"

export const Comments = ({postId}) => {
  const [comments, setComments] = useState([
    {
      author: "Joaby Oliveira",
      authorId: "1",
      content: "Slkk, q setup monstro fih kk 🤤"
    },
    {
      author: "Victor Nathan",
      authorId: "2",
      content: "ai sim hein meu rei, selooco"
    },
    {
      author: "Victor Nathan",
      authorId: "3",
      content: "ai sim hein meu rei, selooco"
    },
    {
      author: "Victor Nathan",
      authorId: "4",
      content: "ai sim hein meu rei, selooco"
    }
  ])

  return (
    <div className={styles.comments}>
      <ul>
        {comments.map(({ author, authorId, content }, index) => {
          if (index < 2) {
            return (
              <li className={`${styles.comment} flex crossCenter`} key={index}>
                <Link href={`users/${authorId}`}><a className={styles.author}>{author}</a></Link>
                <p className={styles.content}>{content}</p>
              </li>
            )
          } else if (index === 2) {
            return (
              <Link href={`posts/${postId}`}>
                <a className={`${styles.moreComments}`}>+ Ver mais comentários</a>
              </Link>
            )
          }
        })}
      </ul>
    </div>
  )
}
