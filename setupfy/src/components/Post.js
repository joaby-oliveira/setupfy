import Link from 'next/link'
import { Heart, MessageCircle, MoreVertical } from 'react-feather'
import styles from '../../styles/components/Post.module.scss'
const Post = (props) => {
  return (
    <article className={`${styles.post} flex column`}>
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
          src={props.src}
          className={styles.image}
        />
      </div>
      <div className={`${styles.bottom} flex column`}>
        <div className={`${styles.icons} flex crossCenter`}>
          <Heart className="icon"/>
          <p className={styles.number}>{props.likes}</p>
          <MessageCircle className="icon"/>
          <p className={styles.number}>{props.comments}</p>
        </div>
      </div>
    </article>
  )
}

export default Post
