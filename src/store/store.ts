import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ADICIONA_TAREFA, ALTERA_PROJETO, ALTERA_TAREFA, DEFINIR_PROJETO, DEFINIR_TAREFA, EXCLUIR_PROJETO, EXCLUIR_TAREFA, NOTIFICAR } from "./type-mutations";
import INotificacao from "@/interfaces/INotificacao";
import { ALTERAR_PROJETO, ALTERAR_TAREFA, CADASTAR_PROJETO, CADASTAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO, REMOVER_TAREFA } from "./type-actions";
import server from '@/server/server'
import ITarefa from "@/interfaces/ITarefa";

interface Estado {
    projetos: IProjeto[],
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        tarefas: [],
        notificacoes: [],
    },
    mutations: {
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO] (state, projeto: IProjeto) {
            const idProjeto = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[idProjeto] = projeto
        },
        [EXCLUIR_PROJETO] (state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_PROJETO] (state, projetos: IProjeto[]) {
            state.projetos = projetos
        },
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA] (state, projeto: IProjeto) {
            const idProjeto = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[idProjeto] = projeto
        },
        [EXCLUIR_TAREFA] (state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        },
        [DEFINIR_TAREFA] (state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [NOTIFICAR] (state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 5000)
        },
    },
    actions: {
        [OBTER_PROJETOS] ({ commit }) {
            server.get('projetos')
            .then(response => commit(DEFINIR_PROJETO, response.data))
        },
        [CADASTAR_PROJETO] (contexto, nomeDoProjeto: string ) {
           return server.post('projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETO] (contexto, projeto: IProjeto) {
           return server.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETO] ({ commit }, id: string) {
           return server.delete(`projetos/${id}`)
           .then(() => commit(EXCLUIR_PROJETO, id))
        },
        [OBTER_TAREFAS] ({ commit }) {
            server.get('tarefas')
            .then(response => commit(DEFINIR_TAREFA, response.data))
        },
        [CADASTAR_TAREFA] ({commit}, tarefa: ITarefa ) {
           return server.post('tarefas', tarefa)
           .then(response => commit(ADICIONA_TAREFA, response.data))
        },
        [ALTERAR_TAREFA] (contexto, projeto: IProjeto) {
           return server.put(`tarefas/${projeto.id}`, projeto)
        },
        [REMOVER_TAREFA] ({ commit }, id: string) {
           return server.delete(`tarefas/${id}`)
           .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
})

export function useStore() : Store<Estado> {
    return vuexUseStore(key)
}