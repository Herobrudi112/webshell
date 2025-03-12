let name = "webOS" //don't forget to change the site title in the html
const version = "49dd6b7"
class FileSystem {

    constructor() {
        this.root = {
            name: '/',
            type: 'dir',
            children: {
                'home': {
                    name: 'home',
                    type: 'dir',
                    children: {
                        'user': {
                            name: 'user',
                            type: 'dir',
                            children: {
                                'notes.txt': {
                                    name: 'notes.txt',
                                    type: 'file',
                                    content: 'This is a preloaded file with some text.'
                                },
                                'script.py': {
                                    name: 'script.py',
                                    type: 'file',
                                    content: 'print("Hello from script.py")'
                                }
                            }
                        }
                    }
                },
                'bin': {
                    name: 'bin',
                    type: 'dir',
                    children: {
                        'hello.sh': {
                            name: 'hello.sh',
                            type: 'file',
                            content: 'echo "Hello, world!"'
                        }
                    }
                }
            }
        };
        this.currentDir = this.root.children.home.children.user;
        this.path = '/home/user/';
        this.startTime = Date.now();
    }

    ls() {
        return Object.keys(this.currentDir.children).join(' ') || '(empty directory)';
    }
    mkdir(name) {
        if (!name) return 'Usage: mkdir <directory>';
        if (this.currentDir.children[name]) return 'Directory already exists';
        this.currentDir.children[name] = {
            name,
            type: 'dir',
            children: {}
        };
        return `Directory '${name}' created.`;
    }
    echo(text) {
        return text ? text : 'Usage: echo <text>';
    }
    rm(name, recursive = false) {
        if (!name) return 'Usage: rm <filename|directory>';
        if (!this.currentDir.children[name]) return 'No such file or directory';
        if (this.currentDir.children[name].type === 'dir') {
            if (!recursive) return 'Cannot remove a directory without -r';
        }
        delete this.currentDir.children[name];
        return `'${name}' removed.`;
    }

    uptime() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
        return `Uptime: ${elapsed} seconds`;
    }
    random(max = 1000) {
        const num = parseInt(max, 10);
        if (isNaN(num) || num <= 0) return 'Usage: random <max> (must be a positive number)';
        return `Random number: ${Math.floor(Math.random() * (num + 1))}`;
    }
    sysinfo() {

        return `
                   -\`                   sach.si@insane-rig
                  .o+\`                  -------------------
                 \`ooo/                  OS: Arch Linux x86_64
                \`+oooo:                 Host: Eurofighter Tranche 4 DDI2
               \`+oooooo:                Kernel: 6.6.7-zen1-1-custom
               -+oooooo+:               ${this.uptime()}
             \`/:-:++oooo+:              Packages: 1984 (pacman)
            \`/++++/+++++++:             Shell: zsh 5.9
           \`/++++++++++++++:            Resolution: 7680x4320 (VR Ready)
          \`/+++ooooooooooooo/\`          DE: i3-gaps + RiceMaster5000
         ./ooosssso++osssssso+\`         WM: OpenBox, but in a box
        .oossssso-\`\`\`\`/ossssss+\`        WM Theme: CyberMatrixOverkill
       -osssssso.      :ssssssso.       Terminal: alacritty (hacked)
      :osssssss/        osssso+++.      CPU: 256-core Quantum AI Processor
     /ossssssss/        +ssssooo/-      GPU: 4x RTX 9090 Ti UltraVoid
   \`/ossssso+/:-        -:/+osssso+-    Memory: 1.5TB DDR6.9 (Overclocked)
  \`+sso+:-\`                 \`.-/+oso:   Storage: 500TB NVMe GenX
 \`++:.                           \`-/+/  Power Supply: Cold Fusion Reactor
 .\`                                 \`   Hidden Feature: 🦄 Secret AI Cluster Online
 `;
        //  `
        //             .-/+oossssoo+/-.
        //         \`:+ssssssssssssssssss+:\`        sach.si@insane-rig
        //       -+ssssssssssssssssssyyssss+-        -------------------
        //     .ossssssssssssssssssdMMMNysssso.      OS: Arch Linux x86_64
        //    /ssssssssssshdmmNNmmyNMMMMhssssss/     Host: Eurofighter Tranche 4 DDI2
        //   +ssssssssshmydMMMMMMMNddddyssssssss+    Kernel: 6.6.7-zen1-1-custom
        //  /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/   ${this.uptime()}
        // .ssssssssdMMMNhsssssssssshNMMMdssssssss.  Packages: 1984 (pacman)
        // +sssshhhyNMMNyssssssssssssyNMMMysssssss+  Shell: zsh 5.9
        // ossyNMMMNyMMhsssssssssssssshmmmhssssssso  Resolution: 7680x4320 (VR Ready)
        // ossyNMMMNyMMhsssssssssssssshmmmhssssssso  DE: i3-gaps + RiceMaster5000
        // +sssshhhyNMMNyssssssssssssyNMMMysssssss+  WM: OpenBox, but in a box
        // .ssssssssdMMMNhsssssssssshNMMMdssssssss.  WM Theme: CyberMatrixOverkill
        //  /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/   Terminal: alacritty (hacked)
        //   +sssssssssdmydMMMMMMMMddddyssssssss+    CPU: 256-core Quantum AI Processor
        //    /ssssssssssshdmNNNNmyNMMMMhssssss/     GPU: 4x RTX 9090 Ti UltraVoid
        //     .ossssssssssssssssssdMMMNysssso.      Memory: 1.5TB DDR6.9 (Overclocked)
        //       -+sssssssssssssssssyyyssss+-        Storage: 500TB NVMe GenX
        //         \`:+ssssssssssssssssss+:\`        Power Source: Cold Fusion Reactor
        //             .-/+oossssoo+/-.              Hidden Feature: 🦄 Secret AI Cluster Online
        //     `;
    }



    ps() {
        return `PID   CMD
                1234  bash
                5678  nano
                9101  node server.js
                1121  python script.py
                6969  virus
                2314  sudo rm -fr /`;
    }
    touch(name) {
        if (!name) return 'Usage: touch <filename>';
        if (this.currentDir.children[name]) return 'File already exists';
        this.currentDir.children[name] = {
            name,
            type: 'file',
            content: ''
        };
        return `File '${name}' created.`;
    }
    nano(name) {
        if (!name) return 'Usage: nano <filename>';
        if (!this.currentDir.children[name]) return 'File not found';
        nanoEditor.value = this.currentDir.children[name].content;
        nanoEditor.style.display = 'block';
        nanoEditor.focus();
        nanoEditor.setAttribute('data-file', name);
        return `Editing '${name}' (Press ESC to save & exit)`;
    }
    saveNano() {
        const name = nanoEditor.getAttribute('data-file');
        if (name && this.currentDir.children[name]) {
            this.currentDir.children[name].content = nanoEditor.value;
        }
        nanoEditor.style.display = 'none';
        nanoEditor.removeAttribute('data-file');
        commandInput.focus();

        const outputDiv = document.createElement('div');
        outputDiv.setAttribute("text_content", `File '${name}' saved.`);
        outputDiv.classList.add("bloom")
        terminal.insertBefore(outputDiv, commandInput.parentElement);
        terminal.scrollTop = terminal.scrollHeight;
    }
    pwd() {
        return this.path;
    }

    cat(name) {
        if (!name) return 'Usage: cat <filename>';
        if (!this.currentDir.children[name] || this.currentDir.children[name].type !== 'file') return 'File not found';
        return this.currentDir.children[name].content || '(empty file)';
    }
    cd(name) {
        if (!name) return 'Usage: cd <directory>';
        if (name === '..') {
            if (this.path === '/') return 'Already at root';
            this.path = this.path.split('/').slice(0, -2).join('/') + '/';
            this.currentDir = this.root;
            this.path.split('/').filter(p => p).forEach(p => this.currentDir = this.currentDir.children[p]);
            return `Moved to '${this.path || '/'}'`;
        }
        if (!this.currentDir.children[name] || this.currentDir.children[name].type !== 'dir') return 'No such directory';
        this.currentDir = this.currentDir.children[name];
        this.path += name + '/';
        return `Moved to '${this.path}'`;
    }
    tree(node = this.currentDir, prefix = '') {
        let output = `${prefix}${node.name}/\n`;
        for (const key in node.children) {
            const child = node.children[key];
            output += this.tree(child, prefix + '  ');
        }
        return output;
    }
    help() {
        let help = `Available commands:
                ls - List directory contents
                sl - most important command ever!
                echo <text> - repeat the text
                rm - deletes files
                pwd - Show current path
                mkdir <directory> - Create a new directory
                touch <filename> - Create a new file
                nano <filename> - Edit a file
                cat <filename> - View file contents
                cd <directory> - Change directory
                tree - Display directory structure
                clear - Clear the terminal
                browser <URL> - opens an iframe displaying a website
                uptime - displays the current uptime in seconds
                random [max] - generates a random number between 0 and max
                ps - displays the current processes
                help - Display this help message
                neofetch - displays system information
                python - run python code!
                wget <URL> - download files from the internet
                winst <repo|list|info|install|uninstall> [args] - Install a program!
                exportfs - exports the filesystem as a json
                importfs - imports the json filesystem
                command1 | command2 - run command1 followed by command2
                exit - Close the session`
        let output = help
        if (Object.keys(installedPackages).length > 0) {
            output += "\n\nInstalled Packages:\n";
            for (let key in installedPackages) {
                let pkg = installedPackages[key];
                output += `                ${pkg.command} - ${pkg.help}\n`;
            }
        }
        return output;
    }
    async wget(url) {
        let response = await fetch(url);
        let data = await response.text();
        let filename = ''
        filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        if (this.currentDir.children[filename]) return 'File already exists';
        this.currentDir.children[filename] = {
            filename,
            type: 'file',
            content: data
        };
        return `File '${filename}' downloaded.`;
    }
}


// ===== WINST Package Manager =====

// Default repository URL (changeable via winst repo <url>)
let winstRepoUrl = "https://raw.githubusercontent.com/mosstuff/webshell-repo/refs/heads/main/packages.json";

// Store installed package metadata (keyed by the registered command)
let installedPackages = {};

// A registry for commands registered by packages.
// When a package is installed, its command is added here.
let customCommands = {};

const winstManager = {
    setRepo: function (url) {
        winstRepoUrl = url;
        return `Repository URL set to ${url}`;
    },
    // Fetch and parse the remote JSON repo.
    fetchRepo: async function () {
        try {
            let response = await fetch(winstRepoUrl);
            let repoData = await response.json();
            // Expect the JSON to have a "packages" array.
            return repoData.packages;
        } catch (e) {
            return Promise.reject("Error fetching repository: " + e.message);
        }
    },
    listPackages: async function () {
        try {
            const packages = await this.fetchRepo();
            let output = "Available packages:\n";
            packages.forEach(pkg => {
                output += `- ${pkg.name} (${pkg.type})\n`;
            });
            return output;
        } catch (err) {
            return err;
        }
    },
    infoPackage: async function (pkgName) {
        try {
            const packages = await this.fetchRepo();
            const pkg = packages.find(p => p.name === pkgName);
            if (!pkg) return `Package ${pkgName} not found in repository.`;
            let output = `Name: ${pkg.name}\nType: ${pkg.type}\nCommand: ${pkg.command}\nHelp: ${pkg.help}\nURL: ${pkg.url}`;
            return output;
        } catch (err) {
            return err;
        }
    },
    installPackage: async function (pkgName) {
        try {
            const packages = await this.fetchRepo();
            const pkg = packages.find(p => p.name === pkgName);
            if (!pkg) return `Package ${pkgName} not found in repository.`;
            // Check if the package's command is already installed.
            if (customCommands[pkg.command]) return `Package ${pkgName} is already installed.`;

            // Fetch the package code from its hosted URL.
            let response = await fetch(pkg.url);
            let code = await response.text();

            // Register a command based on the package type.
            if (pkg.type === "js") {
                // For JavaScript packages, wrap the code into a function.
                customCommands[pkg.command] = function (args) {
                    try {
                        // The package code can use "args" (an array of arguments)
                        return new Function("args", code)(args);
                    } catch (e) {
                        return "Error executing package: " + e.message;
                    }
                };
            } else if (pkg.type === "python") {
                // For Python packages, run the code using our runPython function.
                customCommands[pkg.command] = function (args) {
                    // You can extend this to pass arguments if desired.
                    runPython(code);
                    return ""; // runPython handles its own output.
                };
            } else {
                return "Unsupported package type.";
            }
            // Save package info for help registration.
            installedPackages[pkg.command] = pkg;
            return `Package '${pkg.name}' installed. Command '${pkg.command}' registered.`;
        } catch (e) {
            return "Error installing package: " + e.message;
        }
    },
    uninstallPackage: function (pkgName) {
        // Look for the package by its name in installedPackages.
        let pkgCommand = null;
        for (let cmd in installedPackages) {
            if (installedPackages[cmd].name === pkgName) {
                pkgCommand = cmd;
                break;
            }
        }
        if (!pkgCommand) return `Package ${pkgName} is not installed.`;
        // Remove the command and package entry.
        delete customCommands[pkgCommand];
        delete installedPackages[pkgCommand];
        return `Package '${pkgName}' uninstalled.`;
    }
};

const fs = new FileSystem();
const terminal = document.getElementById('terminal');
const commandInput = document.getElementById('command');
const nanoEditor = document.getElementById('nano-editor');
let commandHistory = [];
let historyIndex = -1;
let pyodide = null; // Pyodide instance
let pyodideReady = false; // Track if Pyodide is loaded
function showGreeting() {
    const greeting = `${name} shell version: ${version} with winst\nType 'help' to see available commands.\n`;
    const greetingDiv = document.createElement('div');
    greetingDiv.setAttribute("text_content", greeting);
    greetingDiv.classList.add("bloom")
    terminal.insertBefore(greetingDiv, commandInput.parentElement);
}
function exportFileSystem(filename) {
    console.log("Exporting filesystem:", JSON.stringify(fs, null, 2)); // Debugging
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "filesystem.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
}

// Function to import a JSON file and restore the filesystem
function importFileSystem(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const importedData = JSON.parse(e.target.result);

            // Ensure it's valid
            if (typeof importedData === "object" && importedData !== null) {
                console.log("Importing new filesystem:", importedData);

                // Clear filesystem before importing (to prevent duplicates)
                fs.root.children = {};

                // Deep clone imported data to avoid reference issues
                fs.root = structuredClone(importedData.root);
                fs.currentDir = fs.root; // Reset to root

                // Save to localStorage (if needed)
                localStorage.setItem("filesystem", JSON.stringify(fs.root));

                console.log("Filesystem successfully imported and updated:", fs.root);

                // Force UI refresh

            } else {
                console.error("Invalid filesystem format.");
            }
        } catch (error) {
            console.error("Error parsing imported filesystem:", error);
        }
    };

    reader.readAsText(file);
}



function displayOutput(text) {
    const outputDiv = document.createElement('div');
    outputDiv.setAttribute("text_content", text);
    outputDiv.classList.add("bloom")
    outputDiv.style.whiteSpace = "pre-wrap"; // Ensure newlines are preserved
    terminal.insertBefore(outputDiv, commandInput.parentElement);
    terminal.scrollTop = terminal.scrollHeight;
}
function startTrainAnimation() {
    const trainFrames = [
        `      ====        ________                ___________ 
  _D _|  |_______/        \\__I_I_____===__|_________| 
   |(_)---  |   H\\________/ |   |        =|___ ___|   
   /     |  |   H  |  |     |   |         ||_| |_||   
  |      |  |   H  |__--------------------| [___] |   
  |  []  |  |   H  |  |     |   |         |       |   
<=|______|__|___H__/_______|___|__________|_______|====
 /==/ |  | |  /  |========================|  | |  |   
     (O)(O)  (O)(O)                      (O)(O)(O)   `
    ];

    let xPos = terminal.clientWidth;
    const trainElement = document.createElement('pre');
    trainElement.style.position = 'absolute';
    trainElement.style.whiteSpace = 'pre';
    trainElement.style.fontFamily = 'monospace';
    trainElement.style.left = `${xPos}px`;
    trainElement.style.top = '57%';
    trainElement.classList.add("bloom")
    terminal.appendChild(trainElement);

    let frameIndex = 0;

    function updateTrain() {
        trainElement.setAttribute("text_content", trainFrames[frameIndex]);
        trainElement.style.left = `${xPos}px`;
        xPos -= 15;

        frameIndex = (frameIndex + 1) % trainFrames.length;

        if (xPos < -trainElement.clientWidth) {
            clearInterval(trainInterval);
            terminal.removeChild(trainElement);
        }
    }

    const trainInterval = setInterval(updateTrain, 100);
}

function openBrowser(url) {
    const browserFrame = document.getElementById('browser-frame');
    if (!url) return "Usage: browser <url>";

    browserFrame.src = url;
    browserFrame.style.display = "block";

    return `Opening ${url} in browser...`;
}

function closeBrowser() {
    const browserFrame = document.getElementById('browser-frame');
    browserFrame.style.display = "none";
    return "Browser closed.";
}


showGreeting();
async function loadPyodideScript() {
    return new Promise((resolve, reject) => {
        if (window.loadPyodide) {
            resolve(); // Pyodide already loaded
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide script"));

        document.head.appendChild(script);
    });
}

async function loadPyodideInstance() {
    const loadingMessage = document.createElement("div");
    loadingMessage.setAttribute("text_content", "Loading Python...");
    loadingMessage.classList.add("bloom")
    terminal.insertBefore(loadingMessage, commandInput.parentElement);
    terminal.scrollTop = terminal.scrollHeight;

    try {
        await loadPyodideScript(); // Ensure Pyodide script is loaded
        pyodide = await globalThis.loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
        pyodideReady = true;
        loadingMessage.setAttribute("text_content", "Python loaded!");
    } catch (e) {
        loadingMessage.setAttribute("text_content", `Failed to load Python: ${e.message}`);
    }

    terminal.scrollTop = terminal.scrollHeight;
}

async function runPython(code) {
    if (!pyodideReady) {
        await loadPyodideInstance();
    }

    try {
        globalThis.__output = [];  // Ensure output storage exists

        function showOutput() {
            let outputDiv = document.getElementById("python-output");
            if (outputDiv) {
                outputDiv.innerHTML = globalThis.__output.join("<br>");

            }
        }

        globalThis.capturePythonOutput = function (text) {
            globalThis.__output.push(text);
            showOutput();
        };

        // Redirect Python stdout/stderr
        await pyodide.runPythonAsync(`
                    import sys
                    from js import globalThis
                    
                    class StdoutRedirect:
                        def write(self, text):
                            if text.strip():
                                globalThis.capturePythonOutput(text)
        
                        def flush(self):
                            pass
                    
                    sys.stdout = StdoutRedirect()
                    sys.stderr = sys.stdout
                `);

        // Check if code is a filename and read it from the virtual filesystem
        if (fs.currentDir.children[code] && fs.currentDir.children[code].type === 'file') {
            const fileContent = fs.currentDir.children[code].content; // Get file contents
            await pyodide.FS.writeFile("/" + code, fileContent); // Save it to Pyodide FS
            code = `exec(open("/${code}").read())`; // Modify code to execute the file
        }

        await pyodide.runPythonAsync(code);
        const outputText = globalThis.__output.join("\n");
        displayOutput(outputText || "");

    } catch (e) {
        displayOutput(`Python Error: ${e}`);
    }
}





async function executeCommand(cmd) {
    if (cmd.trim() && cmd != commandHistory[commandHistory.length - 1]) {
        commandHistory.push(cmd);
    }
    historyIndex = commandHistory.length;
    const parts = cmd.trim().split(' ');
    const commands = cmd.split('|').map(c => c.trim()); // Split commands by '|'
    let input = ''; // Store output of previous command
    for (let i = 0; i < commands.length; i++) {
        const parts = commands[i].split(' ');
        let output = '';
        // Display the command itself before processing it
        const commandDiv = document.createElement('div');
        commandDiv.setAttribute("text_content", `$ ${cmd}`);
        commandDiv.classList.add("bloom")
        terminal.insertBefore(commandDiv, commandInput.parentElement);
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.id = "importFileInput";
        fileInput.style.display = "none";
        fileInput.addEventListener("change", importFileSystem);
        document.body.appendChild(fileInput);


        if (parts[0] === 'python') {
            const code = cmd.slice(7);  // Extract everything after "python "
            await runPython(code);  // Ensure this runs properly
            return;
        }
        if (parts[0] === 'browser' && parts[1]) {
            const url = parts[1];
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.style.width = '100%';
            iframe.style.height = '500px';
            iframe.style.border = 'none';

            const commandDiv = document.createElement('div');
            commandDiv.setAttribute("text_content", `$ ${cmd}`);
            commandDiv.classList.add("bloom")


            terminal.insertBefore(iframe, commandInput.parentElement);
            terminal.scrollTop = terminal.scrollHeight;
            return;
        }


        if (customCommands.hasOwnProperty(parts[0])) {
            try {
                let result = customCommands[parts[0]](parts.slice(1));
                if (result) displayOutput(result);
            } catch (e) {
                output = "Error: " + e.message;
                displayOutput(output)
            }
            return;
        }

        switch (parts[0]) {
            case 'ls':
                output = fs.ls();
                break;
            case 'mkdir':
                output = fs.mkdir(parts[1]);
                break;
            case 'touch':
                output = fs.touch(parts[1]);
                break;
            case 'nano':
                output = fs.nano(parts[1]);
                break;
            case 'cat':
                output = fs.cat(parts[1]);
                break;
            case 'sl':  // New: Steam Locomotive animation
                startTrainAnimation();
                return;
            case 'cd':
                output = fs.cd(parts[1]);
                break;
            case 'tree':
                output = fs.tree();
                break;
            case 'help':
                output = fs.help();
                break;
            case 'neofetch':
                output = fs.sysinfo();
                break;
            case 'rm':
                output = parts[1] === '-r' ? fs.rm(parts[2], true) : fs.rm(parts[1]);
                break;
            case 'clear':
                location.reload();
                return;
            case 'exit':
                commandInput.hidden = true;
                output = 'Session closed';
                break;
            case 'pwd':
                output = fs.pwd();
                break;
            case "exportfs":
                exportFileSystem();
                break;
            case "importfs":
                document.getElementById("importFileInput").click();
                break;
            case 'echo':
                output = fs.echo(parts.slice(1).join(' '));
                break;
            case 'uptime':
                output = fs.uptime();
                break;
            case 'random':
                output = fs.random(parts[1]);
                break;
            case 'ps':
                output = fs.ps();
                break;
            case 'wget':
                output = await fs.wget(parts[1]);
                break
            case 'browser': output = openBrowser(parts[1]);
                break;
            case 'winst': {
                const subcommand = parts[1];
                if (subcommand === 'repo') {
                    output = winstManager.setRepo(parts[2]);
                } else if (subcommand === 'list') {
                    output = await winstManager.listPackages();
                } else if (subcommand === 'info') {
                    output = await winstManager.infoPackage(parts[2]);
                } else if (subcommand === 'install') {
                    output = await winstManager.installPackage(parts[2]);
                } else if (subcommand === 'uninstall') {
                    output = winstManager.uninstallPackage(parts[2]);
                } else {
                    output = "Usage: winst <repo|list|info|install|uninstall> [args]";
                }
                break;
            }
            default:
                output = 'Command not found';
        }

        if (output) {
            displayOutput(output);
        }

        terminal.scrollTop = terminal.scrollHeight;
    }

}

nanoEditor.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        fs.saveNano();
    }
});


commandInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let temp = commandInput.textContent;
        commandInput.textContent = '';
        commandInput.setAttribute("text_content", commandInput.textContent);
        executeCommand(temp);
        event.preventDefault(); // Prevent typing enter
    } else if (event.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            commandInput.textContent = commandHistory[historyIndex];
            commandInput.setAttribute("text_content", commandInput.textContent);
        }
        event.preventDefault(); // Prevent moving the cursor to the start
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(commandInput);
        range.collapse(false); // Move cursor to end of command
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (event.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.textContent = commandHistory[historyIndex];
            commandInput.setAttribute("text_content", commandInput.textContent);
        } else {
            historyIndex = commandHistory.length;
            commandInput.textContent = '';
            commandInput.setAttribute("text_content", commandInput.textContent);
        }
        event.preventDefault(); // Prevent moving the cursor to the end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(commandInput);
        range.collapse(false); // Move cursor to end of command
        sel.removeAllRanges();
        sel.addRange(range);
    }
});
commandInput.addEventListener('input', function (event) {
    commandInput.setAttribute("text_content", commandInput.textContent);
});
setInterval(() => {
    const startTime = performance.now() / 1000; // Get time in seconds
    document.documentElement.style.setProperty('--global-time', startTime);
},30)
