<template>
  <div>
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN GENERAL
    </q-card-title>
    <br/>
    <div class="col">
    <span class="letrasazules">Usuario creador:  </span> <samp class="letrasUser"> {{userName}} </samp>
    </div>
    <br>
    <div class="col">
    <span class="letrasazules">Fecha de inicio:</span>
    <q-datetime v-model="form.fecha_inicio" modal float-label="Fecha" />
    </div>
    <div class="col">
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN DEL RECEPTOR
    </q-card-title>
    <span class="letrasazules">Receptor (médico):  </span>
    <selectComponent @hijo="form.id_cliente = $event"/>
       <div class="col-6 mt-2">
      <q-btn align="between" class="btn-fixed-width espacio" color="primary" label="Buscar" icon="search" @click="datosReceptor()"/>
    </div>
    </div>
    <br/>

    <q-card-title class="bg-primary text-center fondoAzcul">
      TRANSFERENCIA DE VALOR
    </q-card-title>

  <q-table
    title="Datos de receptor"
    :data="tableData"
    :columns="columns"
    row-key="name"
  />
  <br/>
      <div class="col">
      <span class="letrasazules">Recibe directamente la transferencia de valor:  </span>
      <br/>
       <q-radio v-model="form.recibe_directo" val="1" color="green" left-label label="Si" />
       <q-radio v-model="form.recibe_directo" val="0" color="red" left-label label="No" style="margin-left: 10px" /> 
        <q-slide-transition>
          <p v-if="form.recibe_directo === '0'" style="margin: 0; max-width: 500px">
            <tipoPersonaComponent @tT="form.id_tipo_tercero = $event"/>
          </p>
      </q-slide-transition>
    </div>

    <br/>
    <q-table
    title="Datos de receptor"
    :data="cantidad_entregada"
    :columns="columns2"
    row-key="name"
    >

      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="campana" :props="props">
          <span>{{ props.row.campana }}</span>
        </q-td>
        <q-td key="nombre" :props="props">
          <span>{{ props.row.nombre }}</span>
        </q-td>
        <q-td key="tipo" :props="props">
          <span>{{ props.row.tipo }}</span>
        </q-td>
        <q-td key="cantidad_disponible" :props="props">
          <span>{{ props.row.cantidad_disponible }}</span>
        </q-td>
        <q-td key="cantidad_entregada" :props="props">
           <div class="row items-center justify-between no-wrap">
             <q-btn size="sm" round dense color="primary" icon="remove" @click="props.row.cantidad_entregada--" class="q-mr-xs" />
            <q-btn size="sm" round dense color="green" icon="add"  @click="props.row.cantidad_entregada++" class="q-mr-sm" /> 
            <div>{{ props.row.cantidad_entregada }}</div>
          </div>
        </q-td>
      </q-tr>

    </q-table>
  <br/>
    <valorEComponent @temp="form.transfer = $event"/>
     <br/>
    <FirmaComponent @firma="form.firma = $event"/>
    <br/>
    <q-btn align="between" class="btn-fixed-width centrar" color="green" label="Guardar Formulario" icon="send" @click="creacionFormularioOFF()" />
  </div>
</template>

<script>
import { Loading } from 'quasar'
import tipoPersonaComponent from '../components/tipoPersona'
import selectComponent from '../components/select'
import FirmaComponent from '../components/firma'
import valorEComponent from '../components/valorE'
import {peticiones} from '../js/peticiones'
import { bd } from "../js/bd";
import { bdt } from "../js/BDTransValor";


const today = new Date()

export default {
 name: 'transValorComponent',
 mixins:[peticiones],
    components: {
    selectComponent,
    FirmaComponent,
    tipoPersonaComponent,
    valorEComponent,
    
  },
  data () {
    return {
      receptorD: [],
      today,
      text: '',
      visible: true,
      mostrar_form: '',
      dataInfo: '',
      campana: '',
      userName: sessionStorage.user,
      id_periodo: sessionStorage.id_periodo,
      form: {
        id_cliente: '',
        id_periodo: '',
        fecha_inicio: today,
        login:'',
        recibe_directo:1,
        id_tipo_tercero:'',
        campana: [],
        transfer:[],
        firma: [],
        _id: 'transfer_'+Date.now(),
      },
      num_identificacion: 0,
      captures: [],
      activarCamara:true,
      SedeOK:true,
      valor:'',
        
    columns: [
      { name: 'Tipo de documento',
        required: true,
        label: 'Tipo de documento',
        align: 'left',
        field: 'tipo_identificacion',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      { name: 'Número',
        required: true,
        label: 'Número',
        align: 'left',
        field: 'num_identificacion',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      { name: 'Nombre',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: 'nombre',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      { name: 'Departamento',
        required: true,
        label: 'Departamento',
        align: 'left',
        field: 'Departamento',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px' // var array1 = this.form.campana;
      // var array2 = this.form.transfer;
      },
      { name: 'Ciudad',
        required: true,
        label: 'Ciudad',
        align: 'left',
        field: 'ciudad',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      { name: 'Sociedad Cientifica',
        required: true,
        label: 'Sociedad Cientifica',
        align: 'left',
        field: 'Sociedad',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      },
      { name: 'Fima habeas data',
        required: true,
        label: 'Fima habeas data',
        align: 'left',
        field: 'Habeas',
        sortable: true,
        classes: 'my-class',
        style: 'width: 500px'
      }

      ],
    tableData: [
    ],
    columns2: [
    { 
      name: 'campana',
      required: true,
      label: 'campaña',
      align: 'left',
      field: 'campana',
      sortable: true,
      classes: 'my-class',
      style: 'width: 500px'
    },
    { name: 'nombre',
      required: true,
      label: 'nombre',
      align: 'left',
      field: 'nombre',
      sortable: true,
      classes: 'my-class',
      style: 'width: 500px'
    },
    { name: 'tipo',
      required: true,
      label: 'tipo',
      align: 'left',
      field: 'tipo',
      sortable: true,
      classes: 'my-class',
      style: 'width: 500px'
    },
    { name: 'cantidad_disponible',
      required: true,
      label: 'Cantidad disponible',
      align: 'left',
      field: 'cantidad_disponible',
      sortable: true,
      classes: 'my-class',
      style: 'width: 500px'
    },
    { name: 'cantidad_entregada',
      required: true,
      label: 'Cantidad entregada',
      align: 'left',
      field: 'cantidad_entregada',
      sortable: true,
      classes: 'my-class',
      style: 'width: 500px'
    }
   ],
    cantidad_entregada: [
    ]
  
    }
  },
  mounted(){
    this.promocion()
  },
  methods:{
    datosReceptor(){
      bd.get('receptorD')
      .then(doc => {
        this.tableData = doc.data.map(e => e)
      })
    },
    promocion(){
      bd.get('promocion')
      .then(doc => {
        this.cantidad_entregada = doc.data.map(e => e)
      })
    
    },
    validacion () {
      var array1 = this.form.campana;
      var array2 = this.form.transfer;
      // console.log(this.form.id_cliente) valida el id del medico para su validación
      let entregados = array1.filter(element => element.cantidad_entregada > 0);
      if(entregados.length <= 0 && array2.length == 0){
      this.$q.notify({
        color: "red",
        textColor :"white",
        message: "Diligencie la transferencia ó elemento entregado",
        icon: "error",
      })
        return false
      }
      return true
    },
 
    creacionFormulario () {
      if(this.form.recibe_directo == 0 ){
        if (this.form.id_cliente == '')
          {
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione el receptor",
                icon: "warning"
              })
          }else{
            if(this.form.id_tipo_tercero == ''){
            delete this.form.firma
            this.$q.notify({
              color: "warning",
              textColor :"black",
              message: "Seleccione el tipo tercero",
              icon: "warning"
              
            })
            }else{
          if(this.form.fecha_inicio == ''){
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione fecha",
                icon: "warning"
              })
            }else{
            if(this.form.recibe_directo == ''){
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione si recibe directamente",
                icon: "warning"
              })
            }else if(this.validacion()){
      this.$q.loading.show()
      if (this.form.firma == '') {
        delete this.form.firma
      }
      this.form.login= sessionStorage.idsec_users,
      this.form.id_periodo= sessionStorage.id_periodo,
      this.axiosModelo('/transferenciaValor','POST',this.form)
      .then((Data) => {
            Loading.hide()
            switch (Data.status){
              case 203: // Error Autenticación error token
                this.$q.notify({
                  color: "red",
                  textColor :"black",
                  message: "Error foto",
                  icon: "clear"
                })
              break;
              case 201: //OK
                Loading.hide()
                this.form.id_cliente=''
                this.form.fecha_inicio=''
                this.form.recibe_directo=''
                this.form.direccion=''
                  this.$q.notify({
                    color: "green",
                    textColor :"black",
                    message: "Envíos exitosos.",
                    icon: "done",
                    timeout: 3000,
                    closeBtn: location.reload()
                  })
              break;
              case 401: // Error Autenticación error token
                this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
              break;
            }
            this.rspValidacion(Data.status)
          })
          }
          }
          }
          }
      }else{
        if (this.form.id_cliente == ''){
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione el receptor",
                icon: "warning"
              })
        }else{
          if(this.form.fecha_inicio == ''){
           delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione fecha",
                icon: "warning"
              })
          }else{
          if(this.form.recibe_directo == ''){
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione si recibe directamente",
                icon: "warning"
              })
          }else if(this.validacion()){
          this.$q.loading.show()
          if (this.form.firma == '') {
            delete this.form.firma
          }
          this.form.login= sessionStorage.idsec_users,
          this.form.id_periodo= sessionStorage.id_periodo,
          this.axiosModelo('/transferenciaValor','POST',this.form)
          .then((Data) => {
                Loading.hide()
                switch (Data.status){
                  case 203: // Error Autenticación error token
                    this.$q.notify({
                      color: "red",
                      textColor :"black",
                      message: "Valide que todos los campos tengan algun valor",
                      icon: "clear",
                    }) 
                  break;
                  case 201: //OK
                    Loading.hide()
                    this.form.id_cliente=''
                    this.form.fecha_inicio=''
                    this.form.recibe_directo=''
                    this.form.direccion=''
                     this.$q.notify({
                    color: "green",
                    textColor :"black",
                    message: "Envíos exitosos.",
                    icon: "done",
                    timeout: 3000,
                    closeBtn: location.reload()
                  })
                  break;
                  case 401: // Error Autenticación error token
                    this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
                  break;
                }
            this.rspValidacion(Data.status)
          })
      }
      }
      }
      }
    },
    creacionFormularioOFF () {
      if(this.form.recibe_directo == 0 ){
        if (this.form.id_cliente == '')
          {
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione el receptor",
                icon: "warning"
              })
          }else{
            if(this.form.id_tipo_tercero == ''){
            delete this.form.firma
            this.$q.notify({
              color: "warning",
              textColor :"black",
              message: "Seleccione el tipo tercero",
              icon: "warning"
              
            })
            }else{
          if(this.form.fecha_inicio == ''){
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione fecha",
                icon: "warning"
              })
            }else{
            if(this.form.recibe_directo == ''){
            delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione si recibe directamente",
                icon: "warning"
              })
            }else if(this.validacion()){
      // this.$q.loading.show()
      if (this.form.firma == '') {
        delete this.form.firma
      }
      this.form.login= sessionStorage.idsec_users,
      this.form.id_periodo= sessionStorage.id_periodo,
      this.form = {
        _id: Date.now(),
      }
      bdT.put(JSON.stringify(this.form))
       this.$q.notify({
                    color: "green",
                    textColor :"black",
                    message: "Envíos exitosos.",
                    icon: "done",
                    timeout: 3000,
                    closeBtn: location.reload()
                  })
      // this.axiosModelo('/transferenciaValor','POST',this.form)
      // .then((Data) => {
      //       Loading.hide()
      //       switch (Data.status){
      //         case 203: // Error Autenticación error token
      //           this.$q.notify({
      //             color: "red",
      //             textColor :"black",
      //             message: "Error foto",
      //             icon: "clear"
      //           })
      //         break;
      //         case 201: //OK
      //           Loading.hide()
      //           this.form.id_cliente=''
      //           this.form.fecha_inicio=''
      //           this.form.recibe_directo=''
      //           this.form.direccion=''
      //             this.$q.notify({
      //               color: "green",
      //               textColor :"black",
      //               message: "Envíos exitosos.",
      //               icon: "done",
      //               timeout: 3000,
      //               closeBtn: location.reload()
      //             })
      //         break;
      //         case 401: // Error Autenticación error token
      //           this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
      //         break;
      //       }
      //       this.rspValidacion(Data.status)
      //     })
          }
          }
          }
          }
      }else{
        if (this.form.id_cliente == ''){
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione el receptor",
                icon: "warning"
              })
        }else{
          if(this.form.fecha_inicio == ''){
           delete this.form.firma
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione fecha",
                icon: "warning"
              })
          }else{
          if(this.form.recibe_directo == ''){
              this.$q.notify({
                color: "warning",
                textColor :"black",
                message: "Seleccione si recibe directamente",
                icon: "warning"
              })
          }else if(this.validacion()){
          // this.$q.loading.show()
          console.log('holas');
          if (this.form.firma == '') {
            delete this.form.firma
          }
          this.form.login= sessionStorage.idsec_users,
          this.form.id_periodo= sessionStorage.id_periodo,
          bdt.put(this.form)
          console.log(this.form);
          // this.$q.notify({
          //               color: "green",
          //               textColor :"black",
          //               message: "Envíos exitosos.",
          //               icon: "done",
          //               timeout: 3000,
          //               // closeBtn: location.reload()
          //             })
          // this.axiosModelo('/transferenciaValor','POST',this.form)
          // .then((Data) => {
          //       Loading.hide()
          //       switch (Data.status){
          //         case 203: // Error Autenticación error token
          //           this.$q.notify({
          //             color: "red",
          //             textColor :"black",
          //             message: "Valide que todos los campos tengan algun valor",
          //             icon: "clear",
          //           }) 
          //         break;
          //         case 201: //OK
          //           Loading.hide()
          //           this.form.id_cliente=''
          //           this.form.fecha_inicio=''
          //           this.form.recibe_directo=''
          //           this.form.direccion=''
          //            this.$q.notify({
          //           color: "green",
          //           textColor :"black",
          //           message: "Envíos exitosos.",
          //           icon: "done",
          //           timeout: 3000,
          //           closeBtn: location.reload()
          //         })
          //         break;
          //         case 401: // Error Autenticación error token
          //           this.mensaje_notificacion('danger','Error Autenticación error token' + aux_accion)
          //         break;
          //       }
          //   this.rspValidacion(Data.status)
          // })
      }
      }
      }
      }
    },
  }
}
</script>

<style>
.fondoAzcul{
  background:#058BB2;
  color: white;
  border-radius: 10px;
  padding: 10px;
  size: 17px;
}
.letrasazules {
  color: rgb(3, 144, 187);
  left: 85%;
  margin-top: 10px;
  size: 15px;
}
.centrar{
  margin-left: 90px;
}
</style>
