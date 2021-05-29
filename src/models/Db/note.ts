import { transactionStatus } from "../enums/transaction-status";

export type Note = {
    id: string,
    name: string,
    text: string,
    author: string,
    date: string,
    transactionStatus: transactionStatus
}