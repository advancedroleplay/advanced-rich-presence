/**
 * Configuration properties
 */
export const config = {
	name: 'BOT',
	env: process.env.NODE_ENV || 'development',
	logger: {
    level: 'info',
    colorize: true,
    timestamp: true,
    path: './logs'
  },
  bot: {
    token: 'NDQ3MDg5ODI2MTUyMzE2OTI4.XMXoog._W8fE2l3QFJLFsqt-APacHQRXMk',
    users_to_notify: [ '164157163730763777', '164895122394185728' ]
  }
};
