<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluir(projeto)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { TypeNotification } from '@/interfaces/INotificacao';
import IProjeto from '@/interfaces/IProjeto';
import { useStore } from '@/store/store';
import { EXCLUIR_PROJETO, NOTIFICAR } from '@/store/type-mutations';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjetosView',
    methods: {
        excluir (projeto: IProjeto) {
            this.store.commit(EXCLUIR_PROJETO, projeto.id)
            this.store.commit(NOTIFICAR, {
                titulo: projeto.nome,
                texto: 'Projeto excluído com sucesso',
                type: TypeNotification.SUCESSO
            })
        }
    },
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
});
</script>