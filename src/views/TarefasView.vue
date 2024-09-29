<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div v-if="tarefas.length" class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" :indexadorTarefa="index" />
    </div>
    <Box v-else class="lista-vazia">
        <h1><strong>Sua Lista de tarefas está vazia. Crie uma tarefa</strong></h1>
    </Box>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Modal title</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <!-- Content ... -->
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success">Save changes</button>
                    <button class="button">Cancel</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store/store';
import { CADASTAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/type-actions';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'TarefasView',
    components: { Formulario, Tarefa, Box },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTAR_TAREFA, tarefa)
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            tarefas: computed(() => store.state.tarefas),
            store
        }
    }
});
</script>