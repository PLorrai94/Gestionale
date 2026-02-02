#!/bin/bash
# ========================================
# Aider Launch Scripts for Linux/Mac/WSL
# ========================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Common options
COMMON_OPTS="--yes-always --cache-prompts --map-tokens 4096 --dark-mode"

show_help() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${GREEN}Aider Launch Script${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo ""
    echo -e "Usage: ${YELLOW}./aider-launch.sh [mode] [additional-args]${NC}"
    echo ""
    echo "Available modes:"
    echo -e "  ${GREEN}architect${NC}  - R1 Architect + V3 Editor (best for complex tasks)"
    echo -e "  ${GREEN}code${NC}       - V3 Chat direct coding (fast, simple tasks)"
    echo -e "  ${GREEN}ask${NC}        - Ask questions without editing"
    echo -e "  ${GREEN}help${NC}       - Get help about aider"
    echo -e "  ${GREEN}browser${NC}    - Run aider in browser mode"
    echo ""
    echo "Examples:"
    echo -e "  ${YELLOW}./aider-launch.sh architect${NC}"
    echo -e "  ${YELLOW}./aider-launch.sh code myfile.py${NC}"
    echo -e "  ${YELLOW}./aider-launch.sh ask --read README.md${NC}"
    echo ""
}

if [ -z "$1" ]; then
    show_help
    exit 0
fi

MODE=$1
shift  # Remove first argument, pass rest to aider

case $MODE in
    architect)
        echo -e "${GREEN}Starting Aider in ARCHITECT mode (R1 + V3)...${NC}"
        aider --architect \
              --model deepseek/deepseek-reasoner \
              --editor-model deepseek/deepseek-chat \
              $COMMON_OPTS "$@"
        ;;
    code)
        echo -e "${GREEN}Starting Aider in CODE mode (V3 direct)...${NC}"
        aider --model deepseek/deepseek-chat \
              --edit-format diff \
              $COMMON_OPTS "$@"
        ;;
    ask)
        echo -e "${GREEN}Starting Aider in ASK mode (no editing)...${NC}"
        aider --model deepseek/deepseek-chat \
              --edit-format ask \
              $COMMON_OPTS "$@"
        ;;
    help)
        echo -e "${GREEN}Starting Aider in HELP mode...${NC}"
        aider --model deepseek/deepseek-chat \
              --edit-format help \
              $COMMON_OPTS "$@"
        ;;
    browser)
        echo -e "${GREEN}Starting Aider in BROWSER mode...${NC}"
        aider --architect \
              --model deepseek/deepseek-reasoner \
              --editor-model deepseek/deepseek-chat \
              --gui \
              $COMMON_OPTS "$@"
        ;;
    *)
        echo -e "${RED}Unknown mode: $MODE${NC}"
        show_help
        exit 1
        ;;
esac
