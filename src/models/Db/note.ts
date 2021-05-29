import { transactionStatus } from "../enums/transaction-status";

export type Note = {
    name: string,
    text: string,
    Author: string,
    date: string,
    transactionStatus: transactionStatus
}