import express from 'express';
import cors from 'cors';

import audioRouter from './routers/audioManager.mjs';

const app = express();
app.use(cors());
app.use('/api/audio', audioRouter);

const server = app.listen(5000, () => {
    console.log(`server running at http://localhost:${server.address().port}/`)
})