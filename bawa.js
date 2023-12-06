const fs=require('fs')
fs.readFile(__dirname+'/currsem.txt', 'utf-8',function (err, data) {
    if (err) throw err;

console.log(data);
});