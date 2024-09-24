<template>
    <Box>
        <div class="columns is-flex is-align-items-center is-justify-content-space-between">
            <div class="column is-7 is-flex is-justify-content-start has-text-primary">
                {{ tarefa.descricao || `Tarefa ${indexadorTarefa+1}` }}
            </div>
            <div class="column is-flex is-justify-content-end cronometro">
                <span>Tempo gasto: </span> <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent,  PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true },
        indexadorTarefa: {type: Number, default: 0 }
    },
    name: 'TarefaLista',
    components: { Cronometro, Box },
})

</script>

<style scoped>
    .cronometro {
        gap: 0.5rem;
    }
</style>