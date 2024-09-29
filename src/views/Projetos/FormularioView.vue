<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TypeNotification } from '@/interfaces/INotificacao';
import { useStore } from '@/store/store';
import { defineComponent } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTAR_PROJETO } from '@/store/type-actions';

export default defineComponent({
    name: 'FormularioProjetosView',
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    props: {
        id: { type: String }
    },
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    methods: {
        salvar(): void {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => this.lidarComSucesso())
            } else {
                this.store.dispatch(CADASTAR_PROJETO, this.nomeDoProjeto)
                    .then(() => this.lidarComSucesso())
            }

        },
        lidarComSucesso() {
            this.notificar(
                TypeNotification.SUCESSO,
                this.nomeDoProjeto,
                'Projeto adicionado com sucesso! Seu projeto está disponível'
            )
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
});
</script>