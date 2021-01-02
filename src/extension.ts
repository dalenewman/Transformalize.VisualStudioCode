// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	let terminalStack: any[] = [];	
	console.log('transformalize is active');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

    let tflRun = vscode.commands.registerCommand('tfl.run', () => {
        run("default", null);
	});

    let tflSchema = vscode.commands.registerCommand('tfl.schema', () => {
        run("schema", null);
    });

    let tflInit = vscode.commands.registerCommand('tfl.init', () => {
        run("init", null);
    });

    let tflSchedule = vscode.commands.registerCommand('tfl.schedule', () => {
        run("default", "internal");
    });

    function getTerminal(){
        if (terminalStack.length === 0) {
            terminalStack.push(vscode.window.createTerminal(`Transformalize`));
        }
        return terminalStack[terminalStack.length - 1];
    }

    function run(mode:string, schedule:any) {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            console.error("No open text editor!");
            return;
        }

        var file = editor.document.fileName;
        var slash = file.indexOf("/") >= 0 ? "/" : "\\";
        var folder = file.substring(0, file.lastIndexOf(slash) + 1);
        var cfg = vscode.workspace.getConfiguration('tfl');

        var terminal = getTerminal();
        terminal.show();
        terminal.sendText(`cd "${folder}"`);
        terminal.sendText(slash === "/" ? 'clear' : 'cls');
        
        var tfl = "tfl";
        if (cfg && cfg.path !== undefined && cfg.path !== "") {
            if (cfg.path[cfg.path.length - 1] !== slash) {
                tfl = cfg.path + slash + tfl;
            } else {
                tfl = cfg.path + tfl;
            }
        }

        if (schedule !== null) {
            terminal.sendText(`${tfl} -a "${file}" -m ${mode} -s "${schedule}"`);
        } else {
            terminal.sendText(`${tfl} -a "${file}" -m ${mode}`);
        }
    }

    context.subscriptions.push(tflRun);
    context.subscriptions.push(tflSchema);
    context.subscriptions.push(tflInit);
    context.subscriptions.push(tflSchedule);

}

// this method is called when your extension is deactivated
export function deactivate() {}
