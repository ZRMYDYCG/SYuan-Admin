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

基于 vue 的 scoped 实现原理, 如果使用第三方组件或者自己强封装的业务组件或拓展性高的基础组件, 想要在父组件中进行子组件样式以定义类样式的覆盖修改, 子组件最外部的定义类可以直接选中, 因为其带有了与 app 相同的属性, 但是该组件内部的类, 是不可以选中修改的, 此时 :deep() 的作用就来了, 可以进行样式的穿透