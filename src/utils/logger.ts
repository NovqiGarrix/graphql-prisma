import pino from 'pino';
import dayjs from 'dayjs';

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },

    base: {
        pid: false
    },

    timestamp: () => `,"time": "${dayjs().format("MMMM D, YYYY h:mm:ss A")}"`
})

export default logger