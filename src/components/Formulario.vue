<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" area-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual a tarefa você deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.nome }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store/store';
import { TypeNotification } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';

export default defineComponent({
    name: 'FormularioPrincipal',
    components: { Temporizador },
    emits: ['aoSalvarTarefa'],
    setup(props, { emit }) {

        const store = useStore(key)
        const descricao = ref("");
        const idProjeto = ref("")
        const projetos = computed(() => store.state.projeto.projetos)
        const { notificar } = useNotificador()

        const finalizarTarefa = (tempoDecorrido: number) => {
            const projeto = projetos.value.find((proj) => proj.id === idProjeto.value)

            if (!projeto) {
                notificar (
                    TypeNotification.FALHA,
                    'Erro ao Salvar tarefa',
                    'Você deve incluir a tarefa à um projeto existente'
                )
                return
            }

            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id == idProjeto.value)
            })
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,
            finalizarTarefa

        }
    }
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>