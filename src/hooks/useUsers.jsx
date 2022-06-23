import { useState } from "react";

function useUsers(initialUsers) {
  const [users, setUsers] = useState(initialUsers);
  return {users};
}

export default useUsers