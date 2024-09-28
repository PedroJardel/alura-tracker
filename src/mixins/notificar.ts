import { TypeNotification } from "@/interfaces/INotificacao"
import { store } from "@/store/store"
import { NOTIFICAR } from "@/store/type-mutations"

export const notificacaoMixin = {
    methods: {
        notificar(type: TypeNotification, titulo: string, texto: string) {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                type
            })
        }
    }
}