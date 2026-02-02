# 🚀 Aider + DeepSeek Configuration: Claude Code-like Experience

This configuration transforms Aider into an autonomous, intelligent coding assistant similar to Claude Code. It uses **DeepSeek R1** for reasoning/planning and **DeepSeek V3** for code editing.

## 📁 Files Overview

| File | Purpose | Location |
|------|---------|----------|
| `.aider.conf.yml` | Main configuration | Project root or `~` |
| `.aider.model.settings.yml` | Model-specific settings | Project root or `~` |
| `CONVENTIONS.md` | System prompt/behavioral guidelines | Project root |
| `.env` | API keys (keep secret!) | Project root |
| `aider-launch.bat` | Windows launch script | Anywhere in PATH |
| `aider-launch.sh` | Linux/Mac launch script | Anywhere in PATH |

## 🛠️ Setup Instructions

### Step 1: Install Aider
```bash
# Using pip
python -m pip install aider-install
aider-install

# Or using pipx (recommended)
pipx install aider-chat
```

### Step 2: Get DeepSeek API Key
1. Go to https://platform.deepseek.com/api_keys
2. Create an account and generate an API key
3. Copy the key

### Step 3: Configure Environment
```bash
# Linux/Mac - Add to ~/.bashrc or ~/.zshrc
export DEEPSEEK_API_KEY="your_api_key_here"

# Windows - Run in PowerShell as Admin
setx DEEPSEEK_API_KEY "your_api_key_here"
# Restart terminal after setx
```

Or use the `.env` file in your project root.

### Step 4: Copy Configuration Files
```bash
# Copy to home directory (global) or project root (local)
cp .aider.conf.yml ~/
cp .aider.model.settings.yml ~/
cp CONVENTIONS.md ~/

# Make launch script executable (Linux/Mac)
chmod +x aider-launch.sh
```

### Step 5: Verify Installation
```bash
aider --version
aider --model deepseek/deepseek-chat --message "Hello, are you working?"
```

## 🎮 Usage Modes

### Architect Mode (Recommended for Complex Tasks)
Uses R1 for reasoning/planning, V3 for editing. Best for:
- Multi-file refactoring
- Complex feature implementation
- Debugging tricky issues

```bash
# Using launch script
./aider-launch.sh architect

# Or directly
aider --architect --model deepseek/deepseek-reasoner --editor-model deepseek/deepseek-chat
```

### Code Mode (Fast & Direct)
Uses V3 directly for quick edits. Best for:
- Simple bug fixes
- Small features
- Quick modifications

```bash
./aider-launch.sh code myfile.py

# Or directly
aider --model deepseek/deepseek-chat
```

### Ask Mode (No Editing)
For questions and code review without changes:

```bash
./aider-launch.sh ask

# In aider, switch mode with:
/chat-mode ask
```

### Browser Mode
Run Aider with a web UI:

```bash
./aider-launch.sh browser

# Or directly
aider --gui
```

## 🔧 In-Chat Commands

| Command | Description |
|---------|-------------|
| `/add <file>` | Add file to chat |
| `/drop <file>` | Remove file from chat |
| `/read <file>` | Add as read-only |
| `/ls` | List files in chat |
| `/map` | Show repo map |
| `/chat-mode code` | Switch to code mode |
| `/chat-mode architect` | Switch to architect mode |
| `/chat-mode ask` | Switch to ask mode |
| `/model <model>` | Change model |
| `/undo` | Undo last change |
| `/diff` | Show last diff |
| `/commit` | Commit changes |
| `/help` | Show help |

## ⚙️ Key Configuration Options Explained

### Autonomous Behavior
```yaml
yes-always: true           # Never ask for confirmation
auto-accept-architect: true # Auto-accept architect suggestions
suggest-shell-commands: true # Suggest commands to run
watch-files: true          # Watch for AI comments in code
```

### Model Configuration
```yaml
architect: true                        # Enable architect mode
model: deepseek/deepseek-reasoner     # R1 for planning
editor-model: deepseek/deepseek-chat  # V3 for editing
weak-model: deepseek/deepseek-chat    # V3 for summaries
```

### Context & Memory
```yaml
map-tokens: 4096              # Larger repo map
max-chat-history-tokens: 64000 # Long context window
restore-chat-history: true    # Remember previous session
cache-prompts: true           # Cache for faster responses
```

### Git Integration
```yaml
auto-commits: false           # Manual commit control
dirty-commits: true           # Allow commits with dirty repo
attribute-co-authored-by: true # Credit AI in commits
```

## 🎯 Tips for Claude Code-like Experience

### 1. Add CONVENTIONS.md to Every Project
```yaml
# In .aider.conf.yml
read:
  - CONVENTIONS.md
```
This acts as your persistent system prompt.

### 2. Use Architect Mode for Complex Tasks
The R1 model excels at reasoning through problems before editing.

### 3. Add All Relevant Context
```bash
aider --read README.md --read ARCHITECTURE.md myfile.py
```

### 4. Let It Work Autonomously
With `yes-always: true`, Aider will:
- Add files it needs automatically
- Apply changes without asking
- Suggest and run shell commands

### 5. Use the Repo Map
Aider automatically analyzes your codebase. Larger `map-tokens` = more context.

### 6. Watch Files Feature
Add AI comments in your code:
```python
# AI: refactor this function to be async
def slow_function():
    ...
```
Aider will detect and process these with `watch-files: true`.

## 🔍 Troubleshooting

### "Unknown model" Warning
```bash
# Add to .aider.conf.yml
show-model-warnings: false
```

### API Timeout
```bash
# Increase timeout
timeout: 600
```

### Rate Limiting
DeepSeek has generous limits, but if hit:
- Use `cache-prompts: true` to reduce requests
- Consider OpenRouter as alternative provider

### Model Not Responding
```bash
# Test connectivity
curl https://api.deepseek.com/v1/models -H "Authorization: Bearer $DEEPSEEK_API_KEY"
```

## 💰 Cost Optimization

DeepSeek is extremely cost-effective:
- R1: ~$0.55/M input, $2.19/M output
- V3: ~$0.14/M input, $0.28/M output

Tips:
- Use `cache-prompts: true` for repeated context
- Use Code mode for simple tasks (cheaper than Architect)
- Keep context focused (don't add unnecessary files)

## 📚 Resources

- [Aider Documentation](https://aider.chat/docs/)
- [DeepSeek API](https://platform.deepseek.com/)
- [Aider GitHub](https://github.com/Aider-AI/aider)
- [Aider Discord](https://discord.gg/Y7X7bhMQFV)

---

Made with ❤️ for autonomous AI-powered development
