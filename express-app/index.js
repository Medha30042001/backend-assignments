import express from 'express'
import { fileOperations } from './read.js';
import os from 'os'
import {promises as dns} from 'dns'

const app = express();

const PORT = 3000;

app.get('/test', (req, res) => {
    res.send('Test route is working')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

app.get('/readFile', async (req, res) => {
    try {
        const data = await fileOperations();
        res.send(data);
    } catch (error) {
        res.status(500).send('Failed to read file')
    }
})

app.get('/systemdetails', (req, res) => {
    try {
        const platform = os.platform();
        const totalMemory = (os.totalmem()/1024/1024/1024).toFixed(2);
        const freeMemory = (os.freemem()/1024/1024/1024).toFixed(2);
        const cpuModel = (os.cpus()[0].model);

        res.json({
            platform, 
            totalMemory : `${totalMemory} GB`,
            freeMemory : `${freeMemory} GB`,
            cpuModel
        })
    } catch (error) {
    res.status(500).json({error : 'Failed to fetch system details'});
    }
})

app.get('/getip', async (req, res) => {
    try {
        const result = await dns.lookup('masaischool.com');
        res.json({
            website: 'masaischool.com',
            ipAddress: result.address,
        });
    } catch (error) {
        res.status(500).json({error : 'DNS lookup failed'});
    }
});