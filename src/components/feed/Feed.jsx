import { useState, useEffect, useContext } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { publicRequest } from '../../requestMethods'
import { AuthContext } from '../../context/AuthContext'

export default function Feed ({ username }) {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await publicRequest.get('/posts/profile/' + username)
          : await publicRequest.get('posts/timeline/' + user._id)
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
          })
        )
      } catch (err) {
        console.log(err)
      }
    }
    fetchPosts()
  }, [username, user._id])

  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />
        {posts.length > 0
          ? posts.map(p => <Post key={p._id} post={p} />)
          : 'You have no posts'}

        {/* {posts.map(p => (
          <Post key={p._id} post={p} />
        ))} */}
        {/* {posts} */}
      </div>
    </div>
  )
}
