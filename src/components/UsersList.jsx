import useFilters from '../hooks/useFilters';
import useUsers from '../hooks/useUsers';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';

function UsersList({initialUsers}) {

  const {search, onlyActive, sortBy, ...setFiltersFunctions} = useFilters();
  const {users} = useUsers(initialUsers);

  console.log(users)
  let usersFiltered = filtersUsersByActive(users, onlyActive);
  usersFiltered = filtersUsersByName(usersFiltered, search);
  usersFiltered = sortUsers(usersFiltered, sortBy);


  return (
    <div className={style.wrapper}>
        <h1 className={style.title}>Listado de usuarios</h1>
        <UsersListFilters search={search} onlyActive={onlyActive} sortBy={sortBy} {...setFiltersFunctions}/>
        <UsersListRows users={usersFiltered}/>
      </div>
  )
}
export default UsersList

const filtersUsersByName = (users, search) => {
  if (!search) {
    return users;
  }
  return users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
}

const filtersUsersByActive = (users, onlyActive) => {
  if (!onlyActive) {
    return users;
  }
  return users?.filter(user => user.active);
}

const sortUsers = (users, sortBy) => {
  const sortedUsers = [...users];

  switch(sortBy) {
    case 1:
      return sortedUsers.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    case 2: 
      return sortedUsers.sort((a, b) => {
        if (a.role === b.role) return 0;
        if (a.role === 'teacher') return -1;
        if (a.role === 'student' && b.role === 'other') return -1;
        return  1;
      })
    case 3:
      return sortedUsers.sort((a, b) => {
        if (a.active === b.active) return 0;
        if (a.active && !b.active) return -1;
        return  1;
      })
    default:
      return sortedUsers;
  }
}
