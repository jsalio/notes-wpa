import { Table } from "antd";
import React, { useEffect, useState } from "react"
import { ProxyGetAllNote } from "../Data/dataProxy/Notes.data";
import { ApplicationContext } from "../models/context/ApplicationContexts"
import { Note } from "../models/Db/note"

const columns = [
    {
        title: 'Note Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
    },
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
];

export const NoteList: React.FC = (prop) => {
    var { noteContext, online } = React.useContext(ApplicationContext)
    const [dataSet, setDataset] = useState(new Array<Note>())
    useEffect(() => {
        ProxyGetAllNote(online).then((set) => {
            setDataset(set)
        })
    }, [dataSet])
    return <div>
        <Table dataSource={dataSet} columns={columns} />
    </div>
}