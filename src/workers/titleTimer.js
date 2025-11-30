let timeoutId;

self.onmessage = (e) => {
    if (e.data === 'start') {
        // Clear any existing timer just in case
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            self.postMessage('tick');
        }, 2000);
    } else if (e.data === 'clear') {
        if (timeoutId) clearTimeout(timeoutId);
    }
};
