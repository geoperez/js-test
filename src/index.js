export default {
    version: () => 1,
    formatText: (templateFn, data) => templateFn.bind(data)()
};
