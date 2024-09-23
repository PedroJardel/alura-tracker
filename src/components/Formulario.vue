<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" area-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" name="" id="" placeholder="Qual a tarefa você deseja iniciar?">
            </div>
            <div class="column">
                <Temporizador />
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
            tempoEmSegundos: 0,
            cronometro: 0
        }
    },
    name: 'FormularioPrincipal',
    components: { Temporizador }
})
</script>

<style scoped></style>