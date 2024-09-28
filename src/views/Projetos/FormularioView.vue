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
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store/store';
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/type-mutations';
import { defineComponent } from 'vue';

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
    mixins: [notificacaoMixin],
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    methods: {
        salvar(): void {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO, { id: this.id, nome: this.nomeDoProjeto })
                this.notificar(
                    TypeNotification.SUCESSO,
                    this.nomeDoProjeto,
                    'Projeto alterado com sucesso! Seu projeto está disponível',
                )
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
               this.notificar(
                    TypeNotification.SUCESSO,
                    this.nomeDoProjeto,
                    'Projeto adicionado com sucesso! Seu projeto está disponível'
                )
            }
            this.nomeDoProjeto = '';
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
});
</script>