export default {
    version: () => 1,
    formatText: (templateFn, data) => templateFn.bind(data)(),
    createLogger: (templateFn, loggerName) => {
        let i = 0;

        return data => (++i) + ' - ' + loggerName + ' - ' + templateFn.bind(data)();
    }
};
