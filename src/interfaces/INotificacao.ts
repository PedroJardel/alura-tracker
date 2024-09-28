export enum TypeNotification {
    SUCESSO,
    FALHA,
    ATENCAO
}

export default interface INotificacao {
    titulo: string,
    texto: string
    type: TypeNotification
    id: number
}