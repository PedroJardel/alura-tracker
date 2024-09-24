<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" area-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual a tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    data() {
        return {
            descricao: ''
        }
    },
    name: 'FormularioPrincipal',
    components: { Temporizador },
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            console.log('tempo da tarefa', tempoDecorrido)
            console.log('descrição da tarefa', this.descricao)
            this.descricao = ''
        }
    }
})
</script>

<style scoped></style>