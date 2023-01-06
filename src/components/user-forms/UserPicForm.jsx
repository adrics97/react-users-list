import { useContext, useRef, useState } from 'react';
import { updateUserPic } from '../../lib/api/usersApi';
import { UserFormsContext } from '../../lib/contexts/UsersFormContext';
import { fileToDataURL } from '../../lib/utils/file-utils';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import PencilIcon from '../icons/PencilIcon';
import { PictureIcon } from '../icons/PictureIcon';
import style from './UserPicForm.module.css';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const MAX_SIZE = 102400;

const UserPicForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);
	const [preview, setPreview] = useState();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const inputRef = useRef(null);

	const handleClick = async () => {
		if (!preview) return;
		setIsSubmitting(true);
		const success = await updateUserPic(currentUser.id, preview.src);
		if (success) {
			onSuccess();
			closeModal();
		} else {
			setIsSubmitting(false);
		}
	};

	const handleChange = async evt => {
		evt.preventDefault();
		const file = evt.target.files[0];
		if (!file) {
			return setPreview();
		}
		if (!ALLOWED_MIME_TYPES.includes(file.type)) {
			return setPreview({
				erro: 'Sólo JPG/PNG'
			});
		}
		if (file.size > MAX_SIZE) {
			return setPreview({
				erro: 'Máximo 100Kb'
			});
		}
		try {
			const dataUrl = await fileToDataURL(file);
			setPreview({
				src: dataUrl,
				filename: file.name
			});
		} catch (err) {
			setPreview({ error: err.message });
		}
	};

	const getMessage = () => {
		if (!preview) return <span>JPG/PNG | Máx 100 Kb</span>;
		if (preview.filename)
			<span className={style.filename}>{preview.filename}</span>;

		return <span className={style.error}>{preview.error}</span>;
	};

	const message = getMessage();
	const hasPreview = preview && preview.src;
	return (
		<div className={style.wrapper}>
			<div className={style.preview}>
				{hasPreview ? (
					<img alt='Preview' src={preview.src} />
				) : (
					<PictureIcon className={style.icon} />
				)}
				<IconButton
					className={style.iconButton}
					icon={PencilIcon}
					filled
					onClick={() => inputRef.current.click()}
				/>
			</div>
			{message}
			<input
				className={style.input}
				type='file'
				accept={ALLOWED_MIME_TYPES.join(',')}
				onChange={handleChange}
				ref={inputRef}
			></input>
			<Button
				className={style.button}
				onClick={handleClick}
				disabled={isSubmitting || !preview || !preview.src}
			>
				{isSubmitting ? 'Cargando...' : 'Actualizar foto'}
			</Button>
		</div>
	);
};

export default UserPicForm;
