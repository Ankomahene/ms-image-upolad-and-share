import { useContext } from 'react';
import Image from 'next/image';
import { CheckMark, Reload, Share, Trash } from './Icons';
import AppContext from '../context/context';
import styles from '../styles/LocalImage.module.scss';
import { actionType } from '../const/const';
import { ProgressBar } from 'ms-react-progress-bar';
import { uploadImageAsync } from '../services/image-upload-service';
import ImageMeta from './ImageMeta';

const LocalImage = ({ image }) => {
	const { id, filename, isCompleted, isFailed, isUploading, uploadProgress, url } = image;
	const { dispatch, notify } = useContext(AppContext);

	const handleRemoveImageFile = imageId => {
		dispatch({ type: actionType.removeSingleLocalImage, payload: { imageId } });
	};

	const handleUploadSingleImage = () => {
		uploadImageAsync(image, dispatch, notify);
	};

	const progressBarOptions = {
		barColor: isFailed ? '#ececec' : '#728dec',
		height: '15px',
		borderRadius: '5px',
		labelAlignment: 'center',
		containerColor: '#ececec',
		labelColor: isFailed ? 'red' : '#ffffff',
		labelSize: '10px',
		maxValue: 100,
		customLabel: isFailed ? 'failed to upload' : `${uploadProgress}%`
		// transitionDuration: isFailed ? '.1s' : '1s'
	};

	return (
		<div className={styles.imageContainer}>
			<div>
				<div
					className={styles.imageWrapper}
					style={{
						backgroundImage: `url(${url})`
					}}
				>
					<a href={url}>
						<Image src={url} alt="" width="100" height="100" className={styles.image} />
					</a>
					{isCompleted || isUploading ? (
						undefined
					) : (
						<div className={styles.delete} onClick={() => handleRemoveImageFile(id)}>
							<Trash />
						</div>
					)}
				</div>
			</div>
			<div className={styles.details}>
				<div className={styles.imageName}>{filename}</div>
				<div className={styles.uploadSection}>
					<div className={styles.progress}>
						<ProgressBar value={isFailed ? 40 : uploadProgress} options={progressBarOptions} />
					</div>
					<div className={styles.uploadButtonSection}>
						{isCompleted || isUploading || isFailed ? (
							undefined
						) : (
							<button
								className={styles.uploadButton}
								onClick={handleUploadSingleImage}
								title="Upload image"
							>
								Upload
							</button>
						)}
						{isFailed && (
							<button
								className={styles.retryButton}
								onClick={handleUploadSingleImage}
								title="Failed to upload, reload"
							>
								<Reload />
							</button>
						)}

						{isCompleted && (
							<button className={styles.completedButton}>
								<CheckMark />
							</button>
						)}

						{isUploading && (
							<div className={styles.uploading}>
								<Image src="/uploading.gif" alt="uploading" width="100" height="100" />
							</div>
						)}
					</div>
				</div>
				{isCompleted && (
					<div className={styles.shareSection}>
						<div>
							<ImageMeta image={image} />
							<button className={styles.htmlCodeButton}>HTML Code</button>
						</div>
						<button className={styles.shareOnSocialMediaButton}>
							<Share />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default LocalImage;
