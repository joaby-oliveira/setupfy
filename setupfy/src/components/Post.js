import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle, MoreVertical } from 'react-feather'
import styles from '../../styles/components/Post.module.scss'
import { AddComment } from './AddComment'
import { Comments } from './Comments'

const Post = (props) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const postId = "teste"
  return (
    <div>
      <article className={`${isExpanded ? styles.expandedPost : ''} ${styles.post} flex column`}>
        {/* 
        imagem,
        descrição,
        nome,
        hashtag
      */}
        <div className={`${styles.header} flex crossCenter`}>
          <img src={props.ownerImage} width="60" height="60" className={styles.profileImage} />
          <Link href={`/${props.ownerName}`}><a href=""><h2 className={styles.username}>{props.ownerName}</h2></a></Link>
          <MoreVertical className="icon" />
        </div >
        <div className={styles.imageBox}>
          <img
            onClick={() => setIsExpanded(true)}
            src={props.src}
            className={styles.image}
          />
        </div>
        <div className={`${styles.bottom} flex column`}>
          <div className={`${styles.icons} flex crossCenter`}>
            <Heart className="icon" />
            <p className={styles.number}>{props.likes}</p>
            <Link href={`posts/${postId}`}>
              <a><MessageCircle className="icon" /></a>
            </Link>
            <p className={styles.number}>{props.comments}</p>
          </div>
          <Comments postId={postId}/>
        </div>
        <AddComment />
      </article>
    </div>
  )
}

export default Post
