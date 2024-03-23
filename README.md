## 思源后台管理系统

这个模板应该可以帮助你开始使用 Vue 3 在 Vite 中进行开发。

## 推荐的 IDE 设置

VSCode + Volar（禁用 Vetur）+ TypeScript Vue Plugin (Volar)。

## TypeScript 中对 .vue 导入的类型支持

TypeScript 默认无法处理 .vue 导入的类型信息，因此我们用 vue-tsc 替换 tsc CLI 进行类型检查。在编辑器中，我们需要 TypeScript Vue Plugin (Volar) 来让 TypeScript 语言服务了解 .vue 类型。

如果独立的 TypeScript 插件对你来说不够快，Volar 还实现了一个更高性能的 Take Over Mode。你可以通过以下步骤启用它：

1. 禁用内置的 TypeScript 扩展
    1.1 从 VSCode 的命令面板中运行 Extensions: Show Built-in Extensions
    1.2 找到 TypeScript and JavaScript Language Features，右键选择 Disable (Workspace)
2. 通过运行 Developer: Reload Window 从命令面板重新加载 VSCode 窗口。

## 自定义配置

查看 Vite 配置参考。

## 项目设置

```sh
npm install
```

## 开发时编译和热重载

```sh
npm run dev
```

## 生产环境类型检查、编译和压缩

```sh
npm run build
```

## 使用 ESLint 进行代码检查

```sh
npm run lint
```

## css 之 :deep() 使用细节

基于 `vue` 的 `scoped` 实现原理, 如果使用第三方组件或者自己强封装的业务组件或拓展性高的基础组件, 想要在父组件中进行子组件样式以定义类样式的覆盖修改, 子组件最外部的定义类可以直接选中, 因为其带有了与 `app` 相同的属性, 但是该组件内部的类, 是不可以选中修改的, 此时 `:deep()` 的作用就来了, 可以进行样式的穿透, 因此在项目开发过程中, 该组件最外层有与 `app` 相同的一个属性时, 最外层类可以不需要使用 `:deep()` 来选中穿透


## 角色权限控制 - 动态路由 -> 根据不同的菜单, 动态地注册所有的路由, 而不是一次性进行所有路由的注册

后端设计:

RBAC


前端设计:

路由映射的时候, 为了满足所有的进入系统的用户, 我们注册所有的路由, 但是这个注册方式是有一个很大的弊端的, 虽然我们左侧的导航菜单是根据不同用户的权限动态渲染的路由, 但是用户可以通过切换页面路径的方式且切换到其非权限的路由内, 这是及其危险的, 因此, 我们还需要引入一种动态: 通过接口拿到菜单栏的动路由数据之后, 对该用户进行左侧菜单栏动态渲染的同时, 进行**路由的动态注册**

### 方案一: 基于角色的动态路由管理

```ts
const roles = {
    '超级管理员': [所有的路由],
    '普通职员': [部分路由]
}
```

roles 可以前端自己写好, 同样可以接收后端返回的 json

弊端: 每增加一个角色, roles 都得新添加一对 key-value

### 方案二: 基于菜单的动态路由管理

![](https://pic.imgdb.cn/item/65fec19b9f345e8d034d8bc3.png)

核心: 根据用户菜单将其映射为路由对象