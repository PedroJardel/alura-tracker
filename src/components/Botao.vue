<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
        <span class="icon">
            <i :class="classe"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BotaoPadrao',
    props: {
        classe: { type: String, required: true },
        texto: { type: String, rquired: true },
        desabilitado: { type: Boolean, required: true }
    },
    methods : {
        clicado() : void {
            this.$emit('clicado')
        }
    },
    emits: ['clicado']
})
</script>