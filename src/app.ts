import { createServer } from "./utils/server";
<<<<<<< HEAD
import logger from './utils/logger';
import db from './utils/db';
=======
>>>>>>> 40c5cc83e4072451c7da3fe5ed9d38fb6736b02f


db.open()
    .then(() => createServer())
    .then(server => {
        server.listen(3000, () => {
            logger.info('Listening on http://localhost:3000')
        })
    })
    .catch(err => {
        logger.error(`Error: ${err}`)
    })
