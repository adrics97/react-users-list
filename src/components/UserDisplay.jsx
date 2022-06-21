import style from './UserDisplay.module.css';


function UserDisplay({name, username}) {
  return (
    <div className={style.wrapper}>
      <span>{name}</span>
      <span className={style.username}>@{username}</span>
    </div>
  )
}

export default UserDisplay