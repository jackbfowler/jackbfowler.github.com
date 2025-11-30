let timeoutId: number | undefined;

self.onmessage = (e: MessageEvent) => {
    if (e.data === 'start') {
        // Clear any existing timer just in case
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = self.setTimeout(() => {
            self.postMessage('tick');
        }, 2000);
    } else if (e.data === 'clear') {
        if (timeoutId) clearTimeout(timeoutId);
    }
};
