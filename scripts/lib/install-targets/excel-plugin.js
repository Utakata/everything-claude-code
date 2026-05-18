'use strict';

const path = require('path');

const {
  createFlatRuleOperations,
  createInstallTargetAdapter,
  createManagedScaffoldOperation,
  normalizeRelativePath,
} = require('./helpers');

const SUPPORTED_SOURCE_PREFIXES = [
  'rules',
  'commands',
  'agents',
  'skills',
  '.excel-plugin',
  'AGENTS.md',
];

function supportsExcelSourcePath(sourceRelativePath) {
  const normalizedPath = normalizeRelativePath(sourceRelativePath);
  return SUPPORTED_SOURCE_PREFIXES.some(prefix => (
    normalizedPath === prefix || normalizedPath.startsWith(`${prefix}/`)
  ));
}

module.exports = createInstallTargetAdapter({
  id: 'excel-plugin',
  target: 'excel',
  kind: 'project',
  rootSegments: ['.excel-plugin'],
  installStatePathSegments: ['ecc-install-state.json'],
  nativeRootRelativePath: '.excel-plugin',
  supportsModule(module) {
    const paths = Array.isArray(module && module.paths) ? module.paths : [];
    return paths.length > 0;
  },
  planOperations(input, adapter) {
    const modules = Array.isArray(input.modules)
      ? input.modules
      : (input.module ? [input.module] : []);
    const { repoRoot, projectRoot, homeDir } = input;
    const planningInput = { repoRoot, projectRoot, homeDir };
    const targetRoot = adapter.resolveRoot(planningInput);

    return modules.flatMap(module => {
      const paths = Array.isArray(module.paths) ? module.paths : [];
      return paths
        .filter(supportsExcelSourcePath)
        .flatMap(sourceRelativePath => {
          const normalized = normalizeRelativePath(sourceRelativePath);

          if (normalized === 'rules') {
            return createFlatRuleOperations({
              moduleId: module.id,
              repoRoot,
              sourceRelativePath,
              destinationDir: path.join(targetRoot, 'rules'),
            });
          }

          if (normalized === 'agents') {
            return [
              createManagedScaffoldOperation(
                module.id,
                sourceRelativePath,
                path.join(targetRoot, 'agents'),
                'preserve-relative-path'
              ),
            ];
          }

          if (normalized === 'commands') {
            return [
              createManagedScaffoldOperation(
                module.id,
                sourceRelativePath,
                path.join(targetRoot, 'commands'),
                'preserve-relative-path'
              ),
            ];
          }

          if (normalized.startsWith('skills/')) {
            return [
              createManagedScaffoldOperation(
                module.id,
                sourceRelativePath,
                path.join(targetRoot, normalized),
                'preserve-relative-path'
              ),
            ];
          }

          return [adapter.createScaffoldOperation(module.id, sourceRelativePath, planningInput)];
        });
    });
  },
});
