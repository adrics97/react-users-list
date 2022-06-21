import UserStatus from "./UserStatus";
import UserRole from "./UserRole";
import style from "./UserRow.module.css";
import UserDisplay from "./UserDisplay";

function UserRow({username, name, active, role}) {
  return (
    <div className={style.wrapper}>
      <div className={style.name}>
       <UserDisplay name={name} username={username}/>
      </div>
      <div className={style.status}>
        <UserStatus active={active}/>
      </div>
      <div className={style.role}>
        <UserRole role={role}/>
      </div>
      <div className={style.active}>
      </div>
    </div>
  )
}

export default UserRow