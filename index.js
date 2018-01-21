function transformImportScriptsAsync ({types: t}) {
  return {
    visitor: {
      CallExpression (
        path,
        {
          opts: {sourceToDestination, outputDirectory},
          file: {opts: {filename}}
        }
      ) {
        if (t.isIdentifier(path.node.callee, {name: 'importScripts'})) {
          path.replaceWith(t.awaitExpression(path.node));
          path.skip();
        }
      }
    }
  }
}

module.exports = transformImportScriptsAsync
