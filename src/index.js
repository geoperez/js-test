const formatText = (templateFn, data) => templateFn.bind(data)();

export default {
    version: () => 1,
    formatText,
    createLogger: (templateFn, loggerName) => {
        let i = 0;

        return data => `${++i} - ${loggerName} - ${formatText(templateFn, data)}`;
    }
};
