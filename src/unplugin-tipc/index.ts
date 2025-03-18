import type { RsbuildPlugin } from '@rsbuild/core'
import type { TypeReferenceNode } from 'ts-morph'
import path from 'node:path'
import { Project, SyntaxKind } from 'ts-morph'

interface Options {
  tsconfigName?: string
}

interface ScanResult {
  functionName: string
  generics: string[]
  firstArg: string
  genericsSources: Record<string, string>
}

// 解析类型信息
function resolveTypeInfo(typeNode: TypeReferenceNode) {
  const typeName = typeNode.getTypeName().getText()
  const symbol = typeNode.getTypeName().getSymbol()

  if (symbol) {
    const declarations = symbol.getDeclarations()

    declarations?.forEach((decl) => {
      const sourceFile = decl.getSourceFile()
      const importPath = sourceFile.getFilePath()

      if (decl.getKind() === SyntaxKind.ImportSpecifier) {
        // 类型安全转换
        const importSpecifier = decl.asKindOrThrow(SyntaxKind.ImportSpecifier)
        const importDecl = importSpecifier.getImportDeclaration()
        const moduleSpecifier = importDecl.getModuleSpecifier().getText()
        console.log(`类型 ${typeName} 导入路径: ${moduleSpecifier}`)
      }
      else {
        console.log(`类型 ${typeName} 定义于: ${importPath}`)
      }
    })
  }
  else {
    console.log(`类型 ${typeName} 未找到定义`)
  }
}
function findUseTipc(project: Project) {
  const results: ScanResult[] = []
  const importsMap = new Map<string, Set<string>>()

  const sourceFiles = project.getSourceFiles(['**/*.ts', '**/*.tsx'])
  for (const sourceFile of sourceFiles) {
    const callExprs = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)

    for (const callExpr of callExprs) {
      const expression = callExpr.getExpression()

      const functionName
      = expression.getKind() === SyntaxKind.Identifier
        ? expression.getText() // 处理直接函数名（如 fn<T>()）
        : expression.getKind() === SyntaxKind.PropertyAccessExpression
          ? expression.getLastChildByKind(SyntaxKind.Identifier)?.getText() // 处理对象方法（如 obj.fn<T>()）
          : undefined

      if (functionName !== 'useTipc')
        continue

      // 在扫描泛型类型时替换为以下代码
      const typeChecker = project.getTypeChecker() // 获取类型检查器

      // 提取泛型参数
      const typeArgs = callExpr.getTypeArguments()

      const [handlerType, listenerType] = typeArgs.filter(t => t.isKind(SyntaxKind.TypeReference))
        .map(t => t.asKind(SyntaxKind.TypeReference))

      if (handlerType) {
        resolveTypeInfo(handlerType)
      }

      if (listenerType) {
        resolveTypeInfo(listenerType)
      }
    }
  }
}

export function unpluginTipc(options: Options = {}): RsbuildPlugin {
  const { tsconfigName = 'tsconfig.json' } = options

  return {
    name: 'unplugin-tipc',
    setup(api) {
      const tsConfigFilePath = path.join(api.context.rootPath, tsconfigName)
      const project = new Project({ tsConfigFilePath })

      findUseTipc(project)

      api.onBeforeBuild((opt) => {

      })
    },
  }
}
