import UsersList from './components/UsersList'


const USERS = [
  { username: "albert", name: "Albert Einstein", active: true, role: "teacher" },
  { username: "isaacnew", name: "Isaac Newton", active: true, role: "student" },
  { username: "marie", name: "Marie Curie", active: false, role: "student" },
  { username: "jkepler", name: "Johannes Kepler", active: true, role: "other" },
  { username: "nicoopernicus", name: "Nicolaus Copernicus", active: true, role: "teacher" },
  { username: "maxnck", name: "Max Planck", active: false, role: "teacher" },
]
function App() {
  return (
    <UsersList initialUsers={USERS}/>
  )
}

export default App