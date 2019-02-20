const formatText = (templateFn, data) => templateFn.bind(data)();
const defaultLogger = (param) => {
    let i = 0;

    return message => `${++i} - ${param} - ${message}`;
};

export default {
    version: () => 1,
    formatText,
    createLogger: (templateFn, loggerName) => {
        const logger = defaultLogger(loggerName);

        return (data) => logger(formatText(templateFn, data));
    },
    createLevelLogger: (level) => {
        const logger = defaultLogger(level);

        return (message, loggerName) => logger(`${loggerName}:${message[1]}`);
    },
    createLoggerAsync: async (loggerName) => {
        const logger = defaultLogger(loggerName);
        let templateFn;

        return new Promise((resolve, reject) => {
            if (!loggerName)
            {
                reject('Invalid loggerName');
                return;
            }

            resolve({
                setLoggerFn: (fn) => templateFn = fn,
                log: (data) => logger(formatText(templateFn, data))
            });
        });
    },
};