<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
            </p>
        </div>
    <div v-if="tarefas.length" class="lista">

        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" :indexadorTarefa="index"
            @ao-tarefa-clicada="selecionarTarefa" />
    </div>
    <Box v-else class="lista-vazia">
        <h1><strong>Sua Lista de tarefas está vazia. Crie uma tarefa</strong></h1>
    </Box>
    <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Editar</p>
                <button class="delete" aria-label="close" @click="fecharModal"></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="nomeDoProjeto">
                </div>
            </section>
            <footer class="modal-card-foot">
                <div class="buttons">
                    <button class="button is-success" @click="alterarTarefa">Salvar</button>
                    <button class="button" @click="fecharModal">Cancelar</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue'
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import { useStore } from '@/store/store';
import { ALTERAR_TAREFA, CADASTAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/type-actions';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
    name: 'TarefasView',
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    components: { Formulario, Tarefa, Box },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTAR_TAREFA, tarefa)
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null
        },
        alterarTarefa() {
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        const filtro = ref('')

        // const tarefas = computed(() => store.state.tarefa.tarefas.filter((tarefaFiltrada) => !filtro.value || tarefaFiltrada.descricao.includes(filtro.value)))

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        return {
            tarefas: computed (() => store.state.tarefa.tarefas),
            store,
            filtro
        }
    }
});
</script>

<style scoped>
.field {
    padding: 0 1.25rem;
}
</style>