<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateral />
    </div>
    <div class="column is-three-quarter">
      <Formulario @aoSalvarTarefa="salvarTarefa"/>
      <div v-if="tarefas.length" class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index"
        :tarefa="tarefa" :indexadorTarefa="index"/>
      </div>
      <Box v-else class="lista-vazia">
        <h1><strong>Sua Lista de tarefas está vazia. Crie uma tarefa</strong></h1>
      </Box>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue'
import Formulario from './components/Formulario.vue'
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: { BarraLateral, Formulario, Tarefa, Box },
  data() {
    return {
      tarefas: [] as ITarefa[]
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa)
    }
  }
});
</script>

<style scoped>
.lista {
  padding: 1.25rem;
}
.lista-vazia {
  margin: 1.25rem;
}
</style>
