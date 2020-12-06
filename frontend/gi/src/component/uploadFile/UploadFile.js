import React, {Component} from 'react';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constant';
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';

const {Dragger} = Upload;

const props = {
    name: 'file',
    multiple: true,
    action: API_BASE_URL + '/file',
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    },

    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} can not be uploaded`);
        }
    },
};

export default class UploadFile extends Component {

    render() {
        return (
            <div style={{floatContent: "column"}}>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload.
                    </p>
                </Dragger>
            </div>
        );
    }
}