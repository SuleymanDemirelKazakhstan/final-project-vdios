const express = require('express');

const app = express();

app.get('/',(request,response)=>{
    response.send('qwerty');
});

app.listen(3003,()=>console.log('listening to port 3003'));