import Link from 'next/link'
import { Heart, MessageCircle } from 'react-feather'
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
        <img src="https://avatars.githubusercontent.com/u/55921991?v=4" width="60" height="60" className={styles.profileImage} />
        <Link href="/"><a href=""><h2 className={styles.username}>little._.joaby</h2></a></Link>
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
          <MessageCircle className="icon"/>
        </div>
      </div>
    </article>
  )
}

export default Post
