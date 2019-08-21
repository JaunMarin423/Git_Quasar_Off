import PouchDB from 'pouchdb'
// import { app } from 'firebase';

// Se crea la base de datos Controlpharm.
var dbR = new PouchDB('ControlpharmR');
// De por sí ya controla  a version, obgetos, auto incrementales por si solo en dado caso leer la documentación
// se puede ver lo que creo por default en Application/IndexedBD/_puch_Controlpharm...

// const routes = require('./routes')
// app.use('/api', routes)
// router.get('/', function(req, res) {
//     res.json('Obteniendo mensajes')
//   }
// )

export const dbr = {
  put (data) {
    return dbR.put(data)
  },
  // bulkDocs([], function(err, response) {
  //   if (err) { return console.log(err); }
  // })
  get (data) {
    return dbR.get(data)
  },
}