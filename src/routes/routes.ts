import FormularioView from "@/views/Projetos/FormularioView.vue"
import ListaView from "@/views/Projetos/ListaView.vue"
import Projetos from "@/views/ProjetosView.vue"
import Tarefas from "@/views/TarefasView.vue"
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaView
            }, {
                path: 'novo',
                name: 'Novo Projeto',
                component: FormularioView
            }, {
                path: ':id',
                name: 'Editar Projeto',
                component: FormularioView,
                props: true
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router