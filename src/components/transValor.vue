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
    <q-datetime v-model="today" modal float-label="Fecha" />
    </div>
    <div class="col">
    <q-card-title class="bg-primary text-center fondoAzcul">
      INFORMACIÓN DEL RECEPTOR
    </q-card-title>
    <span class="letrasazules">Receptor (médico):  </span>
    <selectComponent/>
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
            <tipoPersonaComponent/>
          </p>
      </q-slide-transition>
    </div>
    <br/>
    
    <q-table
    title="Datos de receptor"
    :data="tableData2"
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
    <valorEComponent/>
     <br/>
    <FirmaComponent @firma="form.firma = $event"/>
    <br/>
    <q-btn align="between" class="btn-fixed-width centrar" color="green" label="Guardar Formulario" icon="send" @click="validacion()" />
  </div>
</template>

<script>
import tipoPersonaComponent from '../components/tipoPersona'
import selectComponent from '../components/select'
import FirmaComponent from '../components/firma'
import valorEComponent from '../components/valorE'
import { bd } from "../js/bd";


const today = new Date()

export default {
 name: 'transValorComponent',
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
        fecha_inicio: '',
        login:'',
        recibe_directo:1,
        id_tipo_tercero:'',
        campana: [],
        transfer:[],
        firma: [],
      },
      num_identificacion: 0,
      captures: [],
      activarCamara:true,
      SedeOK:true,
      valor:'',
      cantidad_entregada: '',
        
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
        style: 'width: 500px'
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
    tableData2: [
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
        this.tableData2 = doc.data.map(e => e)
        console.log(this.tableData2);
      })
    },
    validacion () {
      var array1 = this.form.campana;
      var array2 = this.form.transfer;
      let entregados = array1.filter(element => element.cantidad_entregada > 0);
      if(entregados.length <= 0 && array2.length == 0){
      this.$q.notify({
        color: "red",
        textColor :"white",
        message: "Diligencie la transferencia ó elemento entregado",
        icon: "error"
      })
        return false
      }
      return true
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
