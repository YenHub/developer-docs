# Pushing an empty commit

Sometimes it's helpful to be able to push empty commits.

A good example is when you want to trigger a pipeline without making any changes.

```bash
git commit --allow-empty -m "Trigger Build"
```
