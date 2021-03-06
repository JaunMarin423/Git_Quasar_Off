import PouchDB from 'pouchdb'
// import { app } from 'firebase';

// Se crea la base de datos Controlpharm.
var bdT = new PouchDB('ControlpharmT');
// De por sí ya controla  a version, obgetos, auto incrementales por si solo en dado caso leer la documentación
// se puede ver lo que creo por default en Application/IndexedBD/_puch_Controlpharm...

// const routes = require('./routes')
// app.use('/api', routes)
// router.get('/', function(req, res) {
//     res.json('Obteniendo mensajes')
//   }
// )
export const bdt = {
  put (data) {
    return bdT.put(data)
  },
  // bulkDocs([], function(err, response) {
  //   if (err) { return console.log(err); }
  // })
  get (data) {
    return bdT.get(data)
  },
  allDocs(data) {
    return bdT.allDocs({
    include_docs: true,
    attachments: true
  }, function(err, response) {
    if (err) { return console.log(err); }
    // handle result
  });
  },
  remove(data) {
    //  return bdT.remove(data)
     bdT.get(data, function(err, doc) {
       console.log('data', doc);
       
      if (err) { return console.log(err); }
      bdT.remove(doc,function(err, response) {
        console.log('respuesta de borrar', response);
        
        if (err) { return console.log(err); }
      });
    });
  },

}

