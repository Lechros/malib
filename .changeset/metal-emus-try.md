---
"@malib/gear": major
---

feat(gear): unify error handling and add localized error messages

- Standardize gear operation errors with `GearError`.
- Support Korean (`ko`, default) and English (`en`) through `GearConfig.errorLanguage`.
- Share validation logic between capability checks and operations, with consistent error precedence.
- Export `GearConfig`, `ErrorLanguage`, `GearError`, `GearReqJob`, and `GearReqJobData`.
- Replace some errors previously thrown as `TypeError` or `RangeError` with `GearError`. Code that relies on error classes or message text may need updating.
