<!--
Thanks for contributing to @ngui/auto-complete!
Keep PRs small and focused on a single concern — it makes review (and the changelog) much easier.
-->

## Summary

<!-- One or two sentences: what does this PR do and why? -->

## Type of change

<!-- Tick all that apply. -->

- [ ] ✨ Feature (`feat`)
- [ ] 🐛 Bug fix (`fix`)
- [ ] ♻️ Refactor / internal (`refactor` / `chore`)
- [ ] 📝 Documentation (`docs`)
- [ ] ⬆️ Dependency / Angular upgrade (`build`)
- [ ] ⚠️ **Breaking change** (requires a `MIGRATION.md` entry)

## Changes

<!-- Bullet list of the notable changes. -->

-

## Impact

<!--
Who/what is affected? Call out public API changes explicitly.
For breaking changes, describe the before → after and link the MIGRATION.md section.
Write "None — internal only." if there is no consumer-facing impact.
-->

## How to test

<!-- How a reviewer can verify this locally. The default gate for any code change: -->

```bash
npm run build-lib:prod   # build the library first — the demo consumes the built dist
npm run build-docs       # demo/docs build (watch for NG8113 unused-import warnings)
npm run lint
npx ng test auto-complete --watch=false --browsers=ChromeHeadless
npx ng test demo --watch=false --browsers=ChromeHeadless
npm run format:check
```

<!-- Add any manual steps / screenshots (especially for dropdown positioning or styling changes). -->

## Checklist

- [ ] Scope is small and single-concern
- [ ] `build-lib:prod`, `build-docs`, `lint`, unit tests (lib + demo) and `format:check` all pass
- [ ] **CHANGELOG.md** updated (every user-facing change)
- [ ] **README.md** updated (if the public API / usage changed)
- [ ] **MIGRATION.md** updated (for breaking changes)
- [ ] No generated `projects/demo/src/app/build-info.ts` timestamp committed (it's a placeholder)
- [ ] Conventional Commit title; breaking changes marked with `!` and a `BREAKING CHANGE:` footer

## Related issues

<!-- e.g. "Fixes #123" -->
