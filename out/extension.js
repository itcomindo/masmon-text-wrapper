"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    let disposable = vscode.commands.registerCommand('masmon-text-wrapper.wrapText', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const selectedText = document.getText(selection);
            // Ambil custom tags dari konfigurasi
            const customTags = vscode.workspace.getConfiguration('masmon-text-wrapper').get('customTags');
            // Tampilkan QuickPick dengan pilihan HTML tags
            vscode.window.showQuickPick(customTags).then(selectedTag => {
                if (selectedTag) {
                    editor.edit(editBuilder => {
                        editBuilder.replace(selection, `<${selectedTag}>${selectedText}</${selectedTag}>`);
                    });
                }
            });
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map