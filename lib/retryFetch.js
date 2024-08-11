export async function retryFetch(fetchFunction, retries = 3, delay = 1000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fetchFunction();
        } catch (error) {
            if (attempt === retries) {
                throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
