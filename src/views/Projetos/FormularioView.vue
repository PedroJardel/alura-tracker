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
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTAR_PROJETO } from '@/store/type-actions';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioProjetosView',
    props: {
        id: { type: String }
    },
    setup(props) {

        const router = useRouter()

        const store = useStore()
        const { notificar } = useNotificador()

        const nomeDoProjeto = ref("")

        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            nomeDoProjeto.value = projeto?.nome || ''
        }

        const lidarComSucesso = () => {
            notificar(
                TypeNotification.SUCESSO,
                nomeDoProjeto.value,
                'Projeto adicionado com sucesso! Seu projeto está disponível'
            )
            nomeDoProjeto.value = '';
            router.push('/projetos')
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => lidarComSucesso())
            } else {
                store.dispatch(CADASTAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso())
            }

        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
});
</script>