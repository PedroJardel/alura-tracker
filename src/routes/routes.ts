import FormularioView from "@/views/Projetos/FormularioView.vue"
import Projetos from "@/views/ProjetosView.vue"
import Tarefas from "@/views/TarefasView.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    }, {
        path: '/projetos',
        name: 'Projetos',
        component: Projetos
    }, {
        path: '/projetos/novo',
        name: 'Novo Projeto',
        component: FormularioView
    }, {
        path: '/projetos/:id',
        name: 'Editar Projeto',
        component: FormularioView,
        props: true
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router