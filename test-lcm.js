const https = require('https');

const baseUrl = "https://task3-5eov.onrender.com/leramalkevich_gmail_com";

const testCases = [
    { x: '12', y: '18', expected: '36' },
    { x: '7', y: '9', expected: '63' },
    { x: '1', y: '1', expected: '1' },
    { x: '0', y: '5', expected: 'NaN' },
    { x: '-3', y: '5', expected: 'NaN' },
    { x: 'abc', y: '5', expected: 'NaN' },
    { x: '123456789123456789', y: '987654321', expected: 'big' },
    { x: '999999999999999999999', y: '888888888888888888888', expected: 'big' },
    { x: '', y: '18', expected: 'NaN' },
    { x: '12', y: '', expected: 'NaN' },
];

function runTest(x, y, expected) {
    const url = `${baseUrl}?x=${x}&y=${y}`;
    https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const cleanData = data.trim();
            let status = '✅';

            if (expected === 'NaN') {
                if (cleanData !== 'NaN') status = '❌';
            } else if (expected === 'big') {
                if (!/^\d+$/.test(cleanData)) status = '❌';
            } else {
                if (cleanData !== expected) status = '❌';
            }

            console.log(`${status} x=${x}, y=${y} → ${cleanData}`);
        });
    }).on('error', (err) => {
        console.error(`❌ x=${x}, y=${y} → ERROR: ${err.message}`);
    });
}

console.log(`\n🔍 Testing ${baseUrl} ...\n`);
testCases.forEach(test => runTest(test.x, test.y, test.expected));