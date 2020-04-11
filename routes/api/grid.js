const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream')
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
let gfs;

conn.once('open', () => {
  console.log('connection open!');
  gfs = Grid(conn.db);

  router.get('/grid-test', (req, res) => {
    console.log('запрос!')
    res.json({ msg: 'Запрос прошел' });
  });

  router.post('/grid-test', (req, res) => {
    let part = req;
    /* let writeStream = gfs.createWriteStream({
      filename: 'img_' + part.name,
      mode: 'w',
      content_type: part.mimetype
    })
    writeStream.on('close', (file) => {
      return res.status(200).send({
        message: 'файл записан',
        file: file
      });
    })
    writeStream.write(part.data);
    writeStream.end(); */
  })
})

module.exports = router;