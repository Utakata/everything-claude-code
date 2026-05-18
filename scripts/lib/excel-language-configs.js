'use strict';

// Language-specific workbook recipes for the Excel Online harness.
//
// Each entry describes one .xlsx Copilot opens to focus on a single
// language/domain. Sources are resolved relative to the install root (e.g.
// .excel-plugin/ after `install.sh --target excel`). Glob-like patterns are
// expanded by generate-excel-workbook.js — see resolveSheetSources().
//
// Sheet order in the final workbook is:
//   00_INDEX             — rich HTML navigation
//   <rules in order>      — 01_…, 02_…, … (high-priority context)
//   <skills in order>     — language patterns, testing, security
//   <agents in order>     — specialist subagents
//   <commands in order>   — slash-command workflows
//   99_workspace          — empty sheet where Copilot writes code
//   00_COMMITS            — snapshot log seeded by snapshot.js at runtime
//
// "general" is a language-agnostic workbook for planning/review skills that
// apply to any project.

const LANGUAGE_CONFIGS = {
  python: {
    title: 'ECC × Python',
    summary: 'Python rules, patterns, testing, security, plus general planning skills.',
    rules:    ['rules/python', 'rules/common'],
    skills:   ['python-patterns', 'python-testing', 'django-patterns', 'django-tdd', 'fastapi-patterns', 'tdd-workflow', 'code-tour', 'verification-loop'],
    agents:   [/^python-/, /^django-/],
    commands: ['plan.md', 'tdd.md', 'code-review.md'],
  },
  typescript: {
    title: 'ECC × TypeScript',
    summary: 'TypeScript rules plus frontend/backend patterns, testing, planning.',
    rules:    ['rules/typescript', 'rules/common'],
    skills:   ['frontend-patterns', 'backend-patterns', 'tdd-workflow', 'api-design', 'e2e-testing', 'verification-loop'],
    agents:   [/^typescript-/, /^frontend-/, /^backend-/],
    commands: ['plan.md', 'tdd.md', 'e2e.md', 'code-review.md'],
  },
  react: {
    title: 'ECC × React',
    summary: 'React component patterns, frontend design, motion UI, plus testing.',
    rules:    ['rules/typescript', 'rules/web', 'rules/common'],
    skills:   ['frontend-patterns', 'frontend-design-direction', 'motion-ui', 'make-interfaces-feel-better', 'e2e-testing', 'tdd-workflow'],
    agents:   [/^frontend-/, /^design-/],
    commands: ['plan.md', 'tdd.md', 'e2e.md'],
  },
  golang: {
    title: 'ECC × Go',
    summary: 'Go rules, patterns, testing, security, plus planning skills.',
    rules:    ['rules/golang', 'rules/common'],
    skills:   ['golang-patterns', 'golang-testing', 'tdd-workflow', 'verification-loop', 'api-design'],
    agents:   [/^go(lang)?-/],
    commands: ['plan.md', 'tdd.md', 'code-review.md'],
  },
  rust: {
    title: 'ECC × Rust',
    summary: 'Rust rules, patterns, testing, plus general planning.',
    rules:    ['rules/rust', 'rules/common'],
    skills:   ['rust-patterns', 'rust-testing', 'tdd-workflow', 'verification-loop'],
    agents:   [/^rust-/],
    commands: ['plan.md', 'tdd.md', 'code-review.md'],
  },
  kotlin: {
    title: 'ECC × Kotlin',
    summary: 'Kotlin rules and patterns (coroutines, Ktor, Exposed) plus testing.',
    rules:    ['rules/kotlin', 'rules/common'],
    skills:   ['kotlin-patterns', 'kotlin-coroutines-flows', 'kotlin-ktor-patterns', 'kotlin-exposed-patterns', 'kotlin-testing', 'tdd-workflow'],
    agents:   [/^kotlin-/],
    commands: ['plan.md', 'tdd.md'],
  },
  swift: {
    title: 'ECC × Swift',
    summary: 'Swift, SwiftUI, and on-device foundation models patterns.',
    rules:    ['rules/swift', 'rules/common'],
    skills:   ['swiftui-patterns', 'swift-concurrency-6-2', 'swift-actor-persistence', 'swift-protocol-di-testing', 'foundation-models-on-device'],
    agents:   [/^swift-/, /^ios-/],
    commands: ['plan.md', 'tdd.md'],
  },
  java: {
    title: 'ECC × Java',
    summary: 'Java standards, Spring Boot, Quarkus, JPA patterns.',
    rules:    ['rules/java', 'rules/common'],
    skills:   ['java-coding-standards', 'springboot-patterns', 'springboot-tdd', 'springboot-security', 'jpa-patterns', 'quarkus-patterns'],
    agents:   [/^java-/, /^spring-/],
    commands: ['plan.md', 'tdd.md', 'code-review.md'],
  },
  general: {
    title: 'ECC × General',
    summary: 'Language-agnostic planning, review, security, and verification skills.',
    rules:    ['rules/common'],
    skills:   ['tdd-workflow', 'code-tour', 'verification-loop', 'security-review', 'production-audit', 'continuous-learning', 'api-design'],
    agents:   [/^(planner|code-reviewer|tdd-guide|security-)/],
    commands: ['plan.md', 'tdd.md', 'code-review.md', 'security-review.md', 'learn.md'],
  },
};

function listLanguages() { return Object.keys(LANGUAGE_CONFIGS); }
function getLanguageConfig(name) { return LANGUAGE_CONFIGS[name] || null; }
function hasLanguage(name) { return Object.prototype.hasOwnProperty.call(LANGUAGE_CONFIGS, name); }

module.exports = {
  LANGUAGE_CONFIGS,
  getLanguageConfig,
  hasLanguage,
  listLanguages,
};
