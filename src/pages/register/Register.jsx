import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { publicRequest } from '../../requestMethods'
import './register.css'

export default function Register () {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordAgain = useRef()
  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault()
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity('Password do not match!')
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
        await publicRequest.post('/auth/register', user)
        navigate('/login')
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className='login'>
      <div className='loginWrapper'>
        <div className='loginLeft'>
          <h3 className='loginLogo'>Lamasocial</h3>
          <span className='loginDesc'>
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className='loginRight'>
          <form className='loginBox' onSubmit={handleClick}>
            <input
              placeholder='Username'
              className='loginInput'
              required
              ref={username}
            />
            <input
              placeholder='Email'
              type='email'
              className='loginInput'
              required
              ref={email}
            />
            <input
              placeholder='Password'
              type='password'
              className='loginInput'
              required
              ref={password}
              minLength='6'
            />
            <input
              placeholder='Password Again'
              type='password'
              className='loginInput'
              required
              ref={passwordAgain}
              minLength='6'
            />
            <button className='loginButton' type='submit'>
              Sign Up
            </button>
            <Link to='/login' className='loginRegisterButton'>
              Log into Account
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
