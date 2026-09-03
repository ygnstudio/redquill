/** 校验用 obsidian 桩：main.ts 在 Node 里 import 时替代 obsidian 模块（仅类定义，不执行方法） */
export class Plugin {
  app: unknown;
  constructor(..._args: unknown[]) {}
  addCommand(_o: unknown): unknown {}
  addRibbonIcon(..._a: unknown[]): unknown {}
  registerView(..._a: unknown[]): void {}
  addSettingTab(_t: unknown): void {}
  registerEvent(_e: unknown): void {}
  loadData(): Promise<unknown> {
    return Promise.resolve({});
  }
  saveData(_d: unknown): Promise<void> {
    return Promise.resolve();
  }
}
export class PluginSettingTab {}
export class ItemView {
  leaf: unknown;
  constructor(leaf?: unknown) {
    this.leaf = leaf;
  }
  contentEl = {} as any;
}
export class Setting {
  constructor(_el: unknown) {}
  setName(): this {
    return this;
  }
  setClass(): this {
    return this;
  }
  setDesc(): this {
    return this;
  }
  setHeading(): this {
    return this;
  }
  addText(): this {
    return this;
  }
  addToggle(): this {
    return this;
  }
  addDropdown(): this {
    return this;
  }
  addButton(): this {
    return this;
  }
  addExtraButton(): this {
    return this;
  }
}
export class Notice {}
export class MarkdownView {}
export class TFile {}
export class FuzzySuggestModal<T = unknown> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(_app?: unknown) {}
  onChooseItem(_item: T, _evt?: unknown): void {}
  open(): void {}
  close(): void {}
}
export class Modal {
  contentEl = {} as any;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onOpen(): void {}
  onClose(): void {}
  open(): void {}
  close(): void {}
}
export type App = unknown;
export type WorkspaceLeaf = unknown;
