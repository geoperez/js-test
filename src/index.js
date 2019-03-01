const data = {};
const formatText = (templateFn, data) => templateFn.bind(data)();
const defaultLogger = (param, save) => {
    let i = 0;

    return message => {
        const entry = `${++i} - ${param} - ${message}`;

        if (save) {
            data[param] = data[param] ? [...data[param], entry] : [entry];
        }

        return entry;
    };
};

export default {
    version: () => 1,
    formatText,
    createLogger: (templateFn, loggerName) => {
        const logger = defaultLogger(loggerName);

        return (data) => logger(formatText(templateFn, data));
    },
    createLevelLogger: (level) => {
        const logger = defaultLogger(level, true);

        return (message, loggerName) => logger(`${loggerName}:${message[1]}`);
    },
    createLoggerAsync: async (loggerName) => {
        const logger = defaultLogger(loggerName);
        let templateFn;

        return new Promise((resolve, reject) => {
            if (!loggerName) {
                reject('Invalid loggerName');
                return;
            }

            resolve({
                setLoggerFn: (fn) => templateFn = fn,
                log: (data) => logger(formatText(templateFn, data))
            });
        });
    },
    getLogEntries: (level) => {
        function* generator() {
            let index = 0;

            while (true) {
                const entry = data[level][index++];
                if (!entry) {
                    break;
                }
                const reset = yield entry;
                if (reset) {
                    index = 0;
                }
            }
        }
        return {
            *[Symbol.iterator]() {
                yield* generator();
            },
            generator
        };
    },
};