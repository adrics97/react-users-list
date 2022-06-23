import SearchIcon from '../icons/SearchIcon'
import style from './InputSearch.module.css'

function InputSearch({className, ...props}) {
  return (
    <div className={`${style.wrapper} ${className || ''  }`}>
      <SearchIcon  className={style.icon}/>
      <input type='text' className={style.input} {...props}></input>
    </div>
  )
}

export default InputSearch