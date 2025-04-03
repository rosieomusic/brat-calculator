import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/brat-calculator/', // Correct base path for GitHub Pages
	plugins: [vue()],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					// Split node_modules dependencies into a separate chunk
					if (id.includes('node_modules')) {
						return 'vendor'; // All dependencies from node_modules go into 'vendor'
					}
				},
			},
		},
		chunkSizeWarningLimit: 1000, // Increase the chunk size limit to suppress warnings for larger chunks (optional)
	},
});
