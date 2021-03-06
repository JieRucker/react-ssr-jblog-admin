/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/25 16:27
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/25 16:27
 */

import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {getMine, alterSetting, setStore} from '../../redux/setting/mine.redux';

const mapStateProps = state => ({
    mine: state.mine
});

const mapDispatchToProps = dispatch => ({
    getMine, alterSetting, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class MineForm extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        this.props.getMine()
    }

    handleSave = () => {
        this.props.alterSetting({
            avatar: this.props.mine.avatar, /*头像*/
            cover: this.props.mine.cover, /*封面*/
            description: this.props.mine.description, /*描述*/
            github: this.props.mine.github,
            twitter: this.props.mine.twitter,
            juejin: this.props.mine.juejin,
        })
    };

    render() {
        const formLayout = {
            labelCol: {span: 1},
            wrapperCol: {span: 13},
        };

        return (
            <div>
                <Form>
                    <Form.Item label="头像：" {...formLayout}>
                        <Input
                            placeholder="请输入头像地址"
                            name="avatar"
                            value={this.props.mine.avatar}
                            onChange={(event) => {
                                this.props.setStore({
                                    avatar: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="封面：" {...formLayout}>
                        <Input
                            placeholder="请输入封面地址"
                            name="cover"
                            value={this.props.mine.cover}
                            onChange={(event) => {
                                this.props.setStore({
                                    cover: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="描述：" {...formLayout}>
                        <Input.TextArea
                            placeholder="请输入描述内容"
                            name="description"
                            value={this.props.mine.description}
                            autosize={{minRows: 5}}
                            onChange={(event) => {
                                this.props.setStore({
                                    description: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="github：" {...formLayout}>
                        <Input
                            placeholder="请输入github地址"
                            name="github"
                            value={this.props.mine.github}
                            onChange={(event) => {
                                this.props.setStore({
                                    github: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="twitter：" {...formLayout}>
                        <Input
                            placeholder="请输入twitter地址"
                            name="twitter"
                            value={this.props.mine.twitter}
                            onChange={(event) => {
                                this.props.setStore({
                                    twitter: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="juejin：" {...formLayout}>
                        <Input
                            placeholder="请输入juejin地址"
                            name="juejin"
                            value={this.props.mine.juejin}
                            onChange={(event) => {
                                this.props.setStore({
                                    juejin: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        onClick={this.handleSave}
                    >
                        保存
                    </Button>
                </Form>
            </div>
        )
    }
}

const Mine = Form.create()(MineForm);

export default Mine
