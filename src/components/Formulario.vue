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
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store/store';
import { NOTIFICAR } from '@/store/type-mutations';
import { TypeNotification } from '@/interfaces/INotificacao';
import { notificacaoMixin } from '@/mixins/notificar';

export default defineComponent({
    data() {
        return {
            descricao: '',
            idProjeto: ''
        }
    },
    name: 'FormularioPrincipal',
    components: { Temporizador },
    mixins: [notificacaoMixin],
    methods: {
        finalizarTarefa(tempoDecorrido: number): void {
            const projeto = this.projetos.find((proj) => proj.id === this.idProjeto)

            if (!projeto) {
                this.notificar(
                    TypeNotification.FALHA,
                    'Erro ao Salvar tarefa',
                    'Você deve incluir a tarefa à um projeto existente'
                )
                return
            }
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''
        }
    },
    emits: ['aoSalvarTarefa'],
    setup() {
        const store = useStore(key)

        return {
            store,
            projetos: computed(() => store.state.projetos)
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