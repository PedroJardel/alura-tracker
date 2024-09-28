import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./type-mutations";
import INotificacao from "@/interfaces/INotificacao";
import { ALTERAR_PROJETOS, CADASTAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS } from "./type-actions";
import server from '@/server/server'

interface Estado {
    projetos: IProjeto[],
    notificacoes: INotificacao[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: []
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
        [CADASTAR_PROJETOS] (contexto, nomeDoProjeto: string ) {
           return server.post('projetos', {
                nome: nomeDoProjeto
            })
        },
        [ALTERAR_PROJETOS] (contexto, projeto: IProjeto) {
           return server.put(`projetos/${projeto.id}`, projeto)
        },
        [REMOVER_PROJETOS] ({ commit }, id: string) {
           return server.delete(`projetos/${id}`)
           .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
})

export function useStore() : Store<Estado> {
    return vuexUseStore(key)
}