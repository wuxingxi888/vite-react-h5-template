import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

/**
 * AI 编码规范同步脚本
 * 核心逻辑：Single Source of Truth (SSOT)
 * 功能：支持多级文件夹递归、自动化 IDE 环境识别、目标目录清理、差异化后缀名
 */

const ROOT_DIR = process.cwd();

// ============================================================================
// 🔌 1. IDE 适配器配置区 (高拓展性)
// ============================================================================
const IDE_ADAPTERS = [
    {
        id: 'cursor',
        name: 'Cursor',
        mappings: [
            { from: '.agents/rules', to: '.cursor/rules', ext: '.mdc' },
            { from: '.agents/skills', to: '.cursor/skills', ext: '.md' },
        ],
        detect: (env) => {
            const hasCursorKeys = Object.keys(env).some((key) => key.startsWith('CURSOR_'));
            const isTerminalMatch = [
                env.TERMINAL_EMULATOR,
                env.TERM_PROGRAM,
                env.__CFBundleIdentifier,
            ].some(
                (val) => val && (val.toLowerCase().includes('cursor') || val === 'com.todesktop'),
            );
            return hasCursorKeys || isTerminalMatch;
        },
    },
    {
        id: 'windsurf',
        name: 'Windsurf',
        mappings: [
            { from: '.agents/rules', to: '.windsurf/rules', ext: '.md' },
            { from: '.agents/skills', to: '.windsurf/skills', ext: '.md' },
        ],
        detect: (env) => {
            return [env.TERMINAL_EMULATOR, env.TERM_PROGRAM, env.__CFBundleIdentifier].some(
                (val) =>
                    val &&
                    (val.toLowerCase().includes('windsurf') || val === 'com.exafunction.windsurf'),
            );
        },
    },
    {
        id: 'trae',
        name: 'Trae',
        mappings: [
            { from: '.agents/rules', to: '.trae/rules', ext: '.md' },
            { from: '.agents/skills', to: '.trae/skills', ext: '.md' },
        ],
        detect: (env) => {
            return [env.TERMINAL_EMULATOR, env.TERM_PROGRAM].some(
                (val) => val && val.toLowerCase().includes('trae'),
            );
        },
    },
];

// ============================================================================
// ⚙️ 2. 核心同步引擎
// ============================================================================
class SyncEngine {
    constructor(adapters) {
        this.adapters = adapters;
        this.env = process.env;
    }

    /**
     * 自动检测 IDE 环境
     */
    detectEnvironment() {
        return this.adapters.find((adapter) => adapter.detect(this.env)) || null;
    }

    /**
     * 手动选择 IDE 环境 (交互式)
     */
    async promptUserForIDE() {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            console.log('\n⚠️  无法自动识别 AI IDE 环境。');
            console.log('👉 请选择目标 IDE 进行同步：');

            this.adapters.forEach((adapter, index) => {
                console.log(`  [${index + 1}]. ${adapter.name}`);
            });
            console.log(`  [0]. 取消同步`);

            rl.question('\n请输入序号: ', (answer) => {
                rl.close();
                const index = parseInt(answer.trim(), 10) - 1;

                if (index >= 0 && index < this.adapters.length) {
                    resolve(this.adapters[index]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    /**
     * 运行同步任务
     */
    async run() {
        let activeAdapter = this.detectEnvironment();

        if (activeAdapter) {
            console.log(`\x1b[36m%s\x1b[0m`, `🚀 自动检测到环境: ${activeAdapter.name}`);
        } else {
            activeAdapter = await this.promptUserForIDE();
            if (!activeAdapter) {
                console.log('\n\x1b[33m%s\x1b[0m', '已取消。');
                return;
            }
            console.log(`\n\x1b[36m%s\x1b[0m`, `🚀 已手动选择目标: ${activeAdapter.name}`);
        }

        this.executeSync(activeAdapter);
    }

    /**
     * 执行具体拷贝逻辑
     */
    executeSync(adapter) {
        let syncCount = 0;

        // 1. 获取并清理所有目标目录
        const targetDirs = [...new Set(adapter.mappings.map((m) => path.join(ROOT_DIR, m.to)))];
        targetDirs.forEach((targetPath) => {
            if (fs.existsSync(targetPath)) {
                fs.rmSync(targetPath, { recursive: true, force: true });
                console.log(`  🧹 已清理旧目录: ${path.relative(ROOT_DIR, targetPath)}`);
            }
            fs.mkdirSync(targetPath, { recursive: true });
        });

        // 2. 递归遍历映射表
        adapter.mappings.forEach((mapping) => {
            const sourceBase = path.join(ROOT_DIR, mapping.from);
            const targetBase = path.join(ROOT_DIR, mapping.to);

            if (!fs.existsSync(sourceBase)) {
                console.warn(`\x1b[33m%s\x1b[0m`, `  ⚠️  忽略不存在的源目录: ${mapping.from}`);
                return;
            }

            /**
             * 内部递归遍历函数
             */
            const walk = (currentSrc, currentDest) => {
                const items = fs.readdirSync(currentSrc);

                items.forEach((item) => {
                    const srcPath = path.join(currentSrc, item);
                    const stat = fs.statSync(srcPath);

                    if (stat.isDirectory()) {
                        // 如果是目录，则在目标处递归创建
                        const destPath = path.join(currentDest, item);
                        if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
                        walk(srcPath, destPath);
                    } else if (path.extname(item) === '.md') {
                        // 如果是 .md 文件，执行转换并拷贝
                        const targetName = path.basename(item, '.md') + mapping.ext;
                        const destFile = path.join(currentDest, targetName);

                        try {
                            const content = fs.readFileSync(srcPath, 'utf8');
                            fs.writeFileSync(destFile, content);
                            const relSrc = path.relative(ROOT_DIR, srcPath);
                            console.log(`  ✅ 已同步: ${relSrc} -> ${mapping.ext}`);
                            syncCount++;
                        } catch (err) {
                            console.error(`  ❌ 同步失败 ${item}: ${err.message}`);
                        }
                    }
                });
            };

            walk(sourceBase, targetBase);
        });

        if (syncCount > 0) {
            console.log(
                '\x1b[32m%s\x1b[0m',
                `\n✨ 同步成功！共处理 ${syncCount} 个文件，适配 ${adapter.name}。`,
            );
        } else {
            console.warn('\x1b[33m%s\x1b[0m', '\n⚠️  未发现可同步的 Markdown 文件。');
        }
    }
}

// 启动
new SyncEngine(IDE_ADAPTERS).run();
