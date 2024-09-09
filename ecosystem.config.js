module.exports = {
	apps: [{
		name: 'nekosia-www',
		script: './index.js',

		// Configuration options
		exec_mode: 'fork',
		max_memory_restart: '2G',

		// Monitoring changes in files and restarting the application
		watch: false,
		ignore_watch: ['.git', 'node_modules', 'logs', 'eslint.config.mjs', 'ecosystem.config.js'],

		// Logging settings
		log_date_format: 'HH:mm:ss.SSS DD.MM.YYYY',
		merge_logs: true,
		log_file: '/home/sefinek/logs/www/nekosia.cat/combined.log',
		out_file: '/home/sefinek/logs/www/nekosia.cat/out.log',
		error_file: '/home/sefinek/logs/www/nekosia.cat/error.log',

		// Application restart policy
		wait_ready: true,
		autorestart: true,
		max_restarts: 4,
		restart_delay: 4000,
		min_uptime: 3000,

		// Environment variables
		env: {
			NODE_ENV: 'production'
		}
	}]
};