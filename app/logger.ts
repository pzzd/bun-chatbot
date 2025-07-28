const BunLogger = (function () {
    console.log("BunLogger initialized");
    const LOG_PATH = "./logs/log.txt";

    async function log(requestLog: string) {
        try {
            const logs = await Bun.file(LOG_PATH).text();
            // Write (file's content + request's log)
            await Bun.write(LOG_PATH, logs.concat(requestLog,"\n"));
        } catch (e) {
            // If log's file doesn't exist, write new content
            await Bun.write(LOG_PATH, ''.concat(requestLog,"\n"));
        }
    }


    return { log };
}());

export default BunLogger;

// TODO move to another path, not in the app
// TODO ? make logs dir a docker volume
// const LOG_PATH = "./logs/log.txt";

// // Append request's logs to the log's file
// async function log(requestLog: string) {
//     try {
//         const logs = await Bun.file(LOG_PATH).text();
//         // Write (file's content + request's log)
//         await Bun.write(LOG_PATH, logs.concat(requestLog,"\n"));
//     } catch (e) {
//         // If log's file doesn't exist, write new content
//         await Bun.write(LOG_PATH, ''.concat(requestLog,"\n"));
//     }
// }