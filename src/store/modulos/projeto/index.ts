import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store/store";
import { ALTERAR_PROJETO, CADASTAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/type-actions";
import { ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO } from "@/store/type-mutations";
import { Module } from "vuex";
import server from '@/server/server'

export interface EstadoProjeto {
    projetos: IProjeto[]
}

export const projeto: Module<EstadoProjeto, Estado> = {
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
        }
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
        }  
    }
}