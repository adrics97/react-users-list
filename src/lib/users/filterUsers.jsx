import { SORT_OPTIONS } from "../../components/constants/sortOptions";
import { USER_ROLES } from "../../components/constants/userRoles";

export const filtersUsersByName = (users, search) => {
  if (!search) {
    return users;
  }
  return users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
}

export const filtersUsersByActive = (users, onlyActive) => {
  if (!onlyActive) {
    return users;
  }
  return users?.filter(user => user.active);
}

export const sortUsers = (users, sortBy) => {
  const sortedUsers = [...users];

  switch(sortBy) {
    case SORT_OPTIONS.NAME:
      return sortedUsers.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      })
    case SORT_OPTIONS.ROLE: 
      return sortedUsers.sort((a, b) => {
        if (a.role === b.role) return 0;
        if (a.role === USER_ROLES.TEACHER) return -1;
        if (a.role === USER_ROLES.STUDENT && b.role === USER_ROLES.OTHER) return -1;
        return  1;
      })
    case SORT_OPTIONS.ACTIVE:
      return sortedUsers.sort((a, b) => {
        if (a.active === b.active) return 0;
        if (a.active && !b.active) return -1;
        return  1;
      })
    default:
      return sortedUsers;
  }
}