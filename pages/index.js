import styles from '../styles/Home.module.scss';
import Dropzone from '../components/Dropzone';
import LocalUploadedImages from '../components/LocalUploadedImages';
import SimpleReactLightbox from 'simple-react-lightbox';
import { ProgressBar } from 'ms-react-progress-bar';

const Home = () => {
	return (
		<div>
			<main>
				<h1 className={styles.title}>Upload and share your images</h1>
				<h3 className={styles.subTitle}>Maximum Image size allowed is 10MB ok</h3>
				<Dropzone />
				<ProgressBar value={30} />
				<div>Test</div>
				<SimpleReactLightbox>
					<LocalUploadedImages />
				</SimpleReactLightbox>
			</main>
		</div>
	);
};

export default Home;
