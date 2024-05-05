# Developing

## Setting up

- The development branch is `master`.
- All pull requests should be opened against `master`.

To develop locally:

1. Clone the react-text-to-speech repository:

```
git clone https://github.com/SahilAggarwal2004/react-text-to-speech -- --depth=3000 --branch master --single-branch
```

1. Create a new branch:

```
git checkout -b $YOUR_BRANCH_NAME origin/master
```

1. Install the dependencies with:

```
bun install
```

1. Start developing and compile the code to javascript:

```
bun build
```

1. When your changes are finished, commit them to the branch:

```
git add .
git commit -m "$DESCRIBE_YOUR_CHANGES_HERE"
```

1. When you are ready to push, make a fork and then run:

```
git remote set-url origin https://github.com/$YOUR_NAME/react-text-to-speech
git push -u origin $YOUR_BRANCH_NAME
```

## Recommended .vscode/settings.json

If you use Visual Studio Code, you may want to set .vscode/settings.json to this:

```json
{
  "prettier.printWidth": 180,
  "editor.tabSize": 2
}
```
