---
title: "Navigating the Command Line"
description: "Moving around on the command line"
date: 2025-01-15
author: Jeremy Moore
category: Web Dev
tags: []
featured: true
# image: /images/astro-cover.jpg
excerpt: Discover the power of Astro 6 for building content-heavy websites with minimal JavaScript overhead.
---
 <!-- --- -->
<!-- layout: ../../layouts/PageLayout.astro -->
<!-- title: "Navigating the Command Line" -->
<!-- public: true -->
<!-- description: "Moving around on the command line" -->
<!-- slug: "navigating-the-command-line" -->
<!-- publicationDate: 2025-04-27 -->
<!-- category: "dev" -->
<!-- author: "Jeremy Moore" -->
<!-- --- -->
# Navigating the Command Line

## Basic Directory Navigation

- `cd [directory]` – Change to a specific directory
- `cd ..` – Move up one directory
- `cd ~` – Go to the home directory
- `cd -` – Switch to the previous directory
- `pwd` – Print the current directory path

## Listing Files and Directories

- `ls` – List files and directories
- `ls -l` – Long format listing (permissions, size, etc.)
- `ls -a` – Include hidden files (those starting with a dot)
- `ls -lh` – Human-readable file sizes

## Path Shortcuts and Auto-Completion

- `~` – Home directory (e.g., `cd ~/Documents`)
- `.` – Current directory
- `..` – Parent directory
- `Tab` – Auto-complete filenames and directories

## Moving the Cursor Within a Command

- `Ctrl + A` – Move to the beginning of the line
- `Ctrl + E` – Move to the end of the line
- `Alt + B` – Move back one word
- `Alt + F` – Move forward one word
- `Ctrl + U` – Cut everything before the cursor
- `Ctrl + K` – Cut everything after the cursor
- `Ctrl + W` – Cut the word before the cursor
- `Ctrl + Y` – Paste (yank) the last cut text
- `Ctrl + L` – Clear the terminal screen

## Command History Navigation

- `↑ / ↓` – Scroll through command history
- `Ctrl + R` – Reverse search through command history
- `history` – Show full command history
- `!n` – Re-run command number *n* from history
- `!!` – Repeat the last command

## Quick Directory Jumps

- `cd /` – Jump to the root directory
- `cd ../../` – Move up two directories
- `cd ~/Desktop` – Go directly to the Desktop
