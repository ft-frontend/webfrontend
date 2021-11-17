const eventSystem = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.data));
    },
    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(event, { data: data }));
    },
    remove(event, callback) {
        document.removeEventListener(event, callback);
    },
};

export default eventSystem;