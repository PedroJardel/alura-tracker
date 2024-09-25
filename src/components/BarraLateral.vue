<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <Botao :texto="textoBotao" :classe="'fa-solid fa-circle-half-stroke'" :desabilitado="false"
            @clicado="alterarTema" />
        <nav class="panel mt-5">
            <ul>
                <li>
                    <RouterLink
                    to="/"
                    class="link"
                    >
                        <i class="fas fa-tasks"></i>
                        tarefas
                    </RouterLink>
                </li>
                <li>
                    <RouterLink
                    to="/projetos"
                    class="link"
                    >
                        <i class="fas fa-project-diagram"></i>
                        projetos
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Botao from './Botao.vue';

export default defineComponent({
    data() {
        return {
            modoEscuroAtivo: false
        }
    },
    name: 'BarraLateral',
    components: { Botao },
    computed: {
        textoBotao() {
            if (this.modoEscuroAtivo) {
                return 'Desativar modo escuro'
            }
            return 'Ativar modo escuro'
        }
    },
    methods: {
        alterarTema(): void {
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
        }
    },
    emits: ['aoTemaAlterado']
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}

.panel li {
    text-align: start;
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>