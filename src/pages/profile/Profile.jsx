import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'

export default function Profile () {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const username = useParams().username
  useEffect(() => {
    const fetchUser = async () => {
      const res = await publicRequest.get(
        `/users?username=${username}`
        // '/users?userId=633826c59c2c697c8fc963b5'
      )
      setUser(res.data)
      console.log(user)
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              <img
                className='profileCoverImg'
                src={user.coverPicture ? user.coverPicture : PF + 'post/3.jpeg'}
                alt=''
              />
              <img
                className='profileUserImg'
                src={
                  !user.profilePicture ||
                  user.sex !== 'male' ||
                  user.sex !== 'female'
                    ? PF + 'person/defaultMale.png'
                    : user.sex === 'male'
                    ? PF + 'person/defaultMale.png'
                    : user.sex === 'female'
                    ? PF + 'person/defaultFemale.jpg'
                    : PF + 'person/defaultMale.png'
                }
                alt=''
              />
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{user.username}</h4>
              <span className='profileInfoDesc'>{user.desc}</span>
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
