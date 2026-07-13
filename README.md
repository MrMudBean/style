# style

[![version](<https://img.shields.io/npm/v/@vvi/sstyle.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/@vvi/sstyle) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/MrMudBean/style/issues)

提供一个简单样式集（虽然叫样式集，但是是用于 HTML 节点元素的样式类名）。

## 安装

```bash
npm install --save @vvi/style

# pnpm
pnpm add --save @vvi/style

# yarn
yarn add --save @vvi/style
```

## 使用

并不会自动注入 css 或 scss 样式，需要手动引入

```tsx
import { style } from "@vvi/style";

export const Home = () => {

    return <div className={style('center', 'text-center')}>你好</div>
}
```

当然，简单的使用仅是为元素添加样式，若想让其样式生效，还需要手动引入对应样式：

```ts
// 方式一：直接引入 css
import "@vvi/style/common.css";

// 方式二：使用 scss
import "@vvi/style/common.scss";

// 方式三：使用构建方法
import { ensureGlobalStyles } from '@vvi/style';

// 该方法不建议直接在 SSR/SSG 环境下直接使用
ensureGlobalStyles(); 
```

但是，直接在 "ts" 或 "tsx" 文件中引入 ".css" 或 ".scss" 文件在部分使用场景下无法被正确的引入到项目。可以通过项目内使用新建项目级 ".css" 或 ".scss" 文件，然后在该文件中引入样式。

```ts
// 引入项目级的文件 
import "./common.css";
// common.css 文件
import "@vvi/style/common.css";

// 或使用 
import "./common.scss";
// common.scss 文件
@use '@vvi/style/common.scss';
```

## 状态

此软件包是 `MrMudBean` 生态系统的一部分。
它使用严格的 TypeScript 编写，并通过 Rollup 构建进行验证。
虽然单元测试较少，但 API 稳定，并在生产环境中大量使用。
