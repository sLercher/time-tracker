import adapter from '@sveltejs/adapter-static';

/** @param {string | undefined} value */
function normalizeBasePath(value) {
	if (!value || value === '/') return '';

	const trimmed = value.replace(/^\/+|\/+$/g, '');
	if (!trimmed) return '';

	return /** @type {`/${string}`} */ (`/${trimmed}`);
}

const basePath = normalizeBasePath(process.env.BASE_PATH);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: basePath
		},
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};

export default config;
