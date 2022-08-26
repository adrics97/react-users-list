import GridIcon from '../icons/GridIcon';
import ListIcon from '../icons/ListIcon';
import style from './UsersListViewSelector.module.css';

function UsersListViewSelector({ view, setView }) {
	return (
		<div className={style.wrapper}>
			<button onClick={() => setView(false)} disabled={!view}>
				<GridIcon className={style.icon} />
			</button>
			<div className={style.divider}></div>
			<button onClick={() => setView(true)} disabled={view}>
				<ListIcon className={style.icon} />
			</button>
		</div>
	);
}

export default UsersListViewSelector;
