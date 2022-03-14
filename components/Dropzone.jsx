import { useContext, useState, useRef } from 'react';
import Image from 'next/image';
import styles from '../styles/Dropzone.module.scss';
import AppContext from '../context/context';
import { actionType } from '../const/const';
import { scanLoadedFiles } from '../functions/get-acceptable-files';

const Dropzone = () => {
	const { state, dispatch, notify } = useContext(AppContext);
	const [ dragging, setDragging ] = useState(false);
	const fileInput = useRef(null);

	const dragOver = e => {
		e.preventDefault();
		setDragging(true);
	};

	const dragEnter = e => {
		e.preventDefault();
	};

	const dragLeave = e => {
		e.preventDefault();
		setDragging(false);
	};

	const fileDrop = e => {
		e.preventDefault();
		setDragging(false);
		const files = e.dataTransfer.files;
		handleLoadedFiles(files);
	};

	const handleImageUpload = files => {
		handleLoadedFiles(files);
	};

	const handleLoadedFiles = files => {
		const { acceptableFiles, errors } = scanLoadedFiles(state, files);
		addLocalImagesToState(acceptableFiles);
		errors.forEach(errorMessage => {
			notify(errorMessage, 'error');
		});
		fileInput.current.value = '';
	};

	const addLocalImagesToState = newLoadedImages => {
		dispatch({ type: actionType.addLocalImages, payload: { newLoadedImages } });
	};

	const handleClick = () => {
		if (fileInput && fileInput.current) fileInput.current.click();
	};

	return (
		<div
			className={`${styles.dropzone} ${dragging && styles.dragging}`}
			onDragOver={dragOver}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			onDrop={fileDrop}
			onClick={handleClick}
		>
			<div className={styles.icon}>
				<Image src="/image-icon.svg" alt="image icon" width={60} height={60} />
			</div>
			<div className={styles.message}>drag and drop your images or click to browse</div>
			<div className={styles.imageTypesInfo}>upload jpj, png, gif, svg</div>
			<input
				ref={fileInput}
				type="file"
				name="file"
				accept="image/*"
				style={{ display: 'none' }}
				onChange={e => handleImageUpload(e.target.files)}
				multiple
			/>
		</div>
	);
};

export default Dropzone;
