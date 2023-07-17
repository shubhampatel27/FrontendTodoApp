import React, { useContext } from 'react'
import Loader from '../component/Loader';
import { Context} from '../main';


const Profile = () => {
  const {user,isAuthenticated,loading} = useContext(Context)
  return (
    loading ? <Loader/>:(
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    )
  )
}

export default Profile