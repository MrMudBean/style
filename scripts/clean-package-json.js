import {
  pathJoin,
  readFileToJsonSync,
  writeJsonFileSync,
  getDirectoryBy,
} from '@vvi/node';

// 原始 package.json 内容
let packageJson = readFileToJsonSync('./package.json');
const dependencies = packageJson.dependencies;
// 移除冗余的键
[
  'scripts',
  'devDependencies',
  'lint-staged',
  'private',
  'dependencies',
  'packageManager',
  'jja',
  'type',
].forEach(key => delete packageJson[key]);
const esPrefix = 'es'; // es 前缀
const cjsPrefix = 'cjs'; // cjs 前缀
const dtsPrefix = 'es'; // 类型文件的前缀
// 查看当前打包 dist 文件路径
const distParentPath = getDirectoryBy('dist', 'directory');

packageJson = {
  ...packageJson,
  main: cjsPrefix + '/index.js', // 旧版本 CommonJs 入口
  types: dtsPrefix + '/index.d.ts', // 旧版本类型入口
  author: {
    name: '泥豆君',
    email: 'Mr.MudBean@outlook.com',
    url: 'https://mudbean.cn',
  },
  description: '样式',
  sideEffects: ['*.scss', '*.css'], // 如果是 react 等库包，可能需要使用 ['*.css' ,'*.scss' ,'*.sass', '*.less'] 或其他
  license: 'MIT',
  files: [
    cjsPrefix,
    esPrefix,
    'styles',
    'LICENSE',
    'README.md',
    'CHANGELOG.md',
  ],
  exports: {
    '.': {
      import: {
        default: `./${esPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
      require: {
        default: `./${cjsPrefix}/index.js`,
        types: `./${dtsPrefix}/index.d.ts`,
      },
    },
    './common.scss': './styles/common.scss',
    './common.css': './styles/common.css',
    './reset.scss': './styles/reset.scss',
    './reset.css': './styles/reset.css',
    './styles/common.scss': './styles/common.scss',
    './styles/common.css': './styles/common.css',
    './styles/reset.scss': './styles/reset.scss',
    './styles/reset.css': './styles/reset.css',
  },
  keywords: ['style', 'mudbean', 'vvi'],
  homepage: 'https://npm.lmssee.com/style',
  dependencies: dependencies,
  bugs: {
    url: 'https://github.com/MrMudBean/style/issues',
    email: 'Mr.MudBean@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/MrMudBean/style.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  browserslist: ['> 1%', 'last 2 versions'], // 浏览器兼容
  engines: {
    node: '>=18.0.0',
  },
};

{
  // 整理打包后 package.json 文件路径
  const distPackagePath = pathJoin(distParentPath, './dist/package.json');
  // 写入新的 packages.json 文件
  writeJsonFileSync(distPackagePath, packageJson);
}
