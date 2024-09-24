<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
        <Botao @clicado="iniciarCronometro" :classe="'fas fa-play'" :texto="'play'" :desabilitado="cronometroRodando" />
        <Botao @clicado="finalizarCronometro" :classe="'fas fa-stop'" :texto="'stop'"
        :desabilitado="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Botao from './Botao.vue';

export default defineComponent({
    name: 'TemporizadorPrincipal',
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false
        }
    },
    components: { Cronometro, Botao },
    methods: {
        iniciarCronometro() {
            this.cronometroRodando = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1
            }, 1000)
        },

        finalizarCronometro() {
            this.cronometroRodando = false
            clearInterval(this.cronometro)
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    },
    emits: ['aoTemporizadorFinalizado'],
})
</script>

<style scoped></style>