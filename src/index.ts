/**
 * @module @vvi/style
 * @file index.ts
 * @description _
 * @author MrMudBean <Mr.MudBean@outlook.com>
 * @copyright 2026 ©️ MrMudBean
 * @since 2026-01-28 13:03
 * @version 2.0.0-alpha.0
 * @lastModified 2026-07-13 15:31
 */

import { xcn } from 'xcn';
import type { XCN, TypeofClassNameItem } from 'xcn';
import { GLOBAL_CSS } from './css';
import type { VviClassName } from './types';

/**
 * ## 在 xcn 中使用 vvi 样式类
 * @param classNameList
 */
function style<T extends VviClassName[]>(
  ...classNameList: T
): XCN<{
  [K in keyof T]: TypeofClassNameItem<T[K]>;
}> {
  return xcn(...(classNameList.map(e => 'vvi-'.concat(e)) as T));
}

/**
 * ## 测验当前是否已存在
 */
export function ensureGlobalStyles(): boolean | undefined {
  if (!globalThis?.document?.styleSheets) return;
  const elementTagName = 'style';
  const dataUiLib = 'data-ui-lib';
  const name = 'vvi';
  const checkRuleText = '.vvi-color-text';
  // 基本校验
  if (
    globalThis?.document?.querySelector(
      `${elementTagName}[${dataUiLib}="${name}"]`,
    )
  )
    return;
  /// 强校验，防止使用 其他方法将 css 注入到其它样式表中
  const hasStyles = Array.from(document.styleSheets).some(sheet => {
    try {
      return Array.from(sheet.cssRules).some(rule =>
        rule.cssText?.includes(checkRuleText),
      );
    } catch (_e) {
      return false;
    }
  });

  if (hasStyles) return;

  const style = document.createElement(elementTagName);
  style.setAttribute(dataUiLib, name);
  style.textContent = GLOBAL_CSS;
  document.head.appendChild(style);
}

export { style, style as vs, style as vviStyle, style as _en, style as en };
