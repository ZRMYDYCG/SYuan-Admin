const contentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  propsList: [
    { label: '菜单名称', prop: 'name', width: '180px' },
    { label: '级别', prop: 'type', width: '120px' },
    { label: '菜单地址', prop: 'url', width: '150px' },
    { label: '菜单图标', prop: 'icon', width: '80px' },
    { label: '排序', prop: 'sort', width: '120px' },
    { label: '权限', prop: 'permission', width: '180px' },
    { label: '创建时间', prop: 'createAt' },
    { label: '更新时间', prop: 'updateAt' },
    { label: '操作', width: '150px' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  }
}

export default contentConfig
