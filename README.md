# lex-wechat

乐享零工

- css 预编译
  每个页面中添加对应.scss 文件，使用 vscode 编辑，保存会自动编译为.wxss 文件

```js
// app.json
// 添加如下代码，按需引入组件
{
   "lazyCodeLoading": "requiredComponents"
}
```

- form 表单双向绑定，暂时不支持 a.b 路径，如

```js
<input model:value="{{ a.b }}" />
```

这样的表达式目前暂不支持。
