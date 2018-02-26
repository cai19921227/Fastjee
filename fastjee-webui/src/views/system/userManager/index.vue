<template>
    <Card dis-hover>
        <div slot="title">
            <Button type="primary" icon="plus">添加用户</Button>
        </div>
        <div slot="extra">
            <table-search :table-data="tableData1" :search-columns="tableColumns1" />
        </div>
        <Table :border="true" :data="tableData1" :columns="tableColumns1" stripe />
        <div style="margin-top: 10px;">
            <Page :total="100" :current="1" @on-change="changePage"></Page>
        </div>
    </Card>
</template>

<script>
    import TableSearch from '../../../components/TableSearch';
    export default {
        components: {
            TableSearch
        },
        data () {
            return {
                tableData1: this.mockTableData1(),
                tableColumns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '昵称',
                        key: 'nickname'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            //用户状态(0启用,1禁用)
                            const row = params.row;
                            const color = row.status === 0 ? 'green' : 'red';
                            const text = row.status === 0 ? '启用' : '禁用';
                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        align: 'center',
                        width: 130,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editRow(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeRow(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        username: 'user' + Math.round(Math.random() * 10000),
                        nickname: '用户' + Math.round(Math.random() * 10000),
                        email: 'mail'+ Math.round(Math.random() * 10000) +'@gmail.com',
                        status: Math.round(Math.random())
                    });
                }
                return data;
            },
            editRow (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `
                        <p> 用户名：`+ this.tableData1[index].username +`</p>
                        <p> 昵称：`+ this.tableData1[index].nickname +`</p>
                        <p> 邮箱地址：`+ this.tableData1[index].email +`</p>
                    `
                })
            },
            removeRow (index) {
                this.tableData1.splice(index, 1);
            },
            changePage () {
                this.tableData1 = this.mockTableData1();
            }
        }
    };
</script>
