import PouchDB from 'pouchdb'
// import { app } from 'firebase';

// Se crea la base de datos Controlpharm.

var db = new PouchDB('ControlpharmTV');
// De por sí ya controla  a version, obgetos, auto incrementales por si solo en dado caso leer la documentación
// se puede ver lo que creo por default en Application/IndexedBD/_puch_Controlpharm...

// const routes = require('./routes')
// app.use('/api', routes)
// router.get('/', function(req, res) {
//     res.json('Obteniendo mensajes')
//   }
// )

export const bd = {
  put (data) {
    return db.put(data)
  },
  // bulkDocs([], function(err, response) {
  //   if (err) { return console.log(err); }
  // })
  get (data) {
    return db.get(data)
  },
  allDocs(data) {
    return db.allDocs({
    include_docs: true,
    attachments: true
  }, function(err, response) {
    if (err) { return console.log(err); }
    // handle result
  });
  },
  remove(data) {
    //  return db.remove(data)
     db.get(data, function(err, doc) {
       console.log('data', doc);
       
      if (err) { return console.log(err); }
      db.remove(doc,function(err, response) {
        console.log('respuesta de borrar', response);
        
        if (err) { return console.log(err); }
      });
    });
  }
}