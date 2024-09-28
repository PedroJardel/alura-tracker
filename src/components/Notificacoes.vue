<template>
    <div class="notificacoes">
        <article class="message is-success" :class="contexto[notificacao.type]"
            v-for="notificacao in notificacoes" :key="notificacao.id">
            <div class="message-header">
                {{ notificacao.titulo }}
            </div>
            <div class="message-body">
                {{ notificacao.texto }}
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import { TypeNotification } from '@/interfaces/INotificacao';
import { useStore } from '@/store/store';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'NotificacoesAlura',
    data() {
        return {
            contexto: {
                [TypeNotification.SUCESSO]: 'is-success',
                [TypeNotification.ATENCAO]: 'is-warning',
                [TypeNotification.FALHA]: 'is-danger',
            }
        }
    },
    setup() {
        const store = useStore()
        return {
            notificacoes: computed(() => store.state.notificacoes)
        }
    }
})
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 10;
}
</style>