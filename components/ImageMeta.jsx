import React from 'react';
import Popup from 'reactjs-popup';
import styles from '../styles/ImageMeta.module.scss';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy } from './Icons';

const ImageMeta = ({ image }) => {
	return (
		<Popup trigger={<button>Share</button>} position="right center" modal={true}>
			<div className={styles.content}>
				<h3>Image Sharing</h3>

				<div
					className={styles.imageContainer}
					style={{
						backgroundImage: `url(${image.url})`
					}}
				/>

				<div className={styles.viewerLinkSection}>
					<div className={styles.title}> Viewer Link </div>
					<div className={styles.main}>
						<input defaultValue={image.url} className={styles.viewLinkField} readOnly />
						<CopyToClipboard text={image.url}>
							<button>
								<Copy />
							</button>
						</CopyToClipboard>
					</div>
				</div>
				<div className={styles.htmlCodeSection}>
					<div className={styles.title}> HTML Link </div>
					<div className={styles.main}>
						<textarea
							readOnly
							className={styles.textarea}
							defaultValue={`<a href="${image.url}"><img src="${image.url}" alt="${image.filename}" border="0"></a>`}
						/>
						<CopyToClipboard
							text={`<a href="${image.url}"><img src="${image.url}" alt="${image.filename}" border="0"></a>`}
						>
							<button>
								<Copy />
							</button>
						</CopyToClipboard>
					</div>
				</div>
			</div>
		</Popup>
	);
};

export default ImageMeta;
