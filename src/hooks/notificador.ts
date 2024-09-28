import { TypeNotification } from "@/interfaces/INotificacao";
import { store } from "@/store/store";
import { NOTIFICAR } from "@/store/type-mutations";

type Notificador = {
    notificar: (type: TypeNotification, titulo: string, texto: string) => void 
    }

    export default () : Notificador => {
        const notificar = (tipo: TypeNotification, titulo: string, texto: string) : void => {
            store.commit(NOTIFICAR, {
                titulo,
                texto,
                tipo
            })
        }
        return {
            notificar
        }
    }