<template>
    <Box @click="tarefaClicada">
        <div class="columns is-flex is-align-items-center is-justify-content-space-between">
            <div class="column is-4 is-flex is-justify-content-start has-text-primary">
                {{ tarefa.descricao || `Tarefa ${indexadorTarefa + 1}` }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column is-flex is-justify-content-end cronometro">
                <i class="fa-regular fa-clock"></i>
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'TarefaLista',
    components: { Cronometro, Box },
    props: {
        tarefa: { type: Object as PropType<ITarefa>, required: true },
        indexadorTarefa: { type: Number, default: 0 }
    },
    emits: ['aoTarefaClicada'],
    setup(props, { emit }) {
        const tarefaClicada = () => {
            emit('aoTarefaClicada', props.tarefa)
        }

        const tempoGasto = () : string => {
            return new Date(props.tarefa.duracaoEmSegundos*1000)
            .toISOString()
            .substring(11,8)
        }

        return {
            tarefaClicada,
            tempoGasto
        }
    }
})

</script>

<style scoped>
.cronometro {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
</style>