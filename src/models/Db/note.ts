import { transactionStatus } from "../enums/transaction-status";

export type Note = {
    id: string,
    name: string,
    text: string,
    Author: string,
    date: string,
    transactionStatus: transactionStatus
}