import { Button, Card, Col, Input, Row } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useState } from "react"
import { ProxyAddNote } from "../Data/dataProxy/Notes.data"
import { ApplicationContext } from "../models/context/ApplicationContexts"
import { Note } from "../models/Db/note"
import { transactionStatus } from "../models/enums/transaction-status"

export const FormNote: React.FC = (props) => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [details, setDetails] = useState('')
    var { noteContext, online } = React.useContext(ApplicationContext)

    const handlerClick = () => {
        console.log('try to save content')
        let note: Note = {
            id: '0',
            name: name,
            author: author,
            date: new Date().toDateString(),
            text: details,
            transactionStatus: transactionStatus.pending
        }
        ProxyAddNote(online, note).then(() => {
            setName('');
            setAuthor('');
            setDetails('')
        })
    }

    return <div>
        <Card>
            <Row>
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </Row>
            <Row>
                <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Row>
            <Row>
                <TextArea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} />
            </Row>
            <Row>
                <Col span={24}>
                    <Col span={12}>
                        <Button onClick={handlerClick}>Save</Button>
                    </Col>
                </Col>
            </Row>
        </Card>
    </div>
}