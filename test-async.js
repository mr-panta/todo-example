function simulateAsyncAPI(text, timeout){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(text);
            resolve();
        }, timeout);
    });
}

async function run(){
    await simulateAsyncAPI('A', 1000);
    await simulateAsyncAPI('B', 500);
    await simulateAsyncAPI('C', 100);
    
}

run();