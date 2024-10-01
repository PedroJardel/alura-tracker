import ITarefa from "@/interfaces/ITarefa";
import server from "@/server/server";
import { Estado } from "@/store/store";
import { OBTER_TAREFAS, CADASTAR_TAREFA, ALTERAR_TAREFA, REMOVER_TAREFA } from "@/store/type-actions";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFA, EXCLUIR_PROJETO } from "@/store/type-mutations";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: [],
      },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const idTarefa = state.tarefas.findIndex(tarefaFind => tarefaFind.id == tarefa.id)
            state.tarefas[idTarefa] = tarefa
        },
        [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas'

            if(filtro) {
                url += '?descricao=' + filtro
            }

            server.get(url)
                .then(response => commit(DEFINIR_TAREFA, response.data))
        },
        [CADASTAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return server.post('tarefas', tarefa)
                .then(response => commit(ADICIONA_TAREFA, response.data))
        },
        [ALTERAR_TAREFA](contexto, tarefa: ITarefa) {
            return server.put(`tarefas/${tarefa.id}`, tarefa)
        },
        [REMOVER_TAREFA]({ commit }, id: string) {
            return server.delete(`tarefas/${id}`)
                .then(() => commit(EXCLUIR_PROJETO, id))
        },
    }
}