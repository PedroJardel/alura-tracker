<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" area-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" name="" id="" placeholder="Qual a tarefa você deseja iniciar?">
            </div>
            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
                    <button class="button" @click="iniciarCronometro">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button" @click="finalizarCronometro">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';

export default defineComponent({
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0
        }
    },
    name: 'FormularioPrincipal',
    methods: {
        iniciarCronometro() {
           this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },

        finalizarCronometro() {
            clearInterval(this.cronometro)
        }
    },
    components: { Cronometro }
})
</script>

<style scoped></style>