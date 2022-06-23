import useFilters from '../hooks/useFilters';
import useUsers from '../hooks/useUsers';
import UsersListFilters from './UsersListFilters';
import UsersListRows from './UsersListRows';
import style from './UsersList.module.css';
import { filtersUsersByActive, filtersUsersByName, sortUsers } from '../lib/users/filterUsers';

function UsersList({initialUsers}) {

  const {search, onlyActive, sortBy, ...setFiltersFunctions} = useFilters();
  const {users} = useUsers(initialUsers);

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

