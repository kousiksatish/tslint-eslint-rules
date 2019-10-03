import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-max-params';

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: 'enforce a maximum number of parameters in function definitions',
    rationale: Lint.Utils.dedent`
      Functions that take numerous parameters can be difficult to read and write because it
      requires the memorization of what each parameter is, its type, and the order they should appear in.
      As a result, many coders adhere to a convention that caps the number of parameters a function can take.
      `,
    optionsDescription: Lint.Utils.dedent`
      `,
    options: {
      type: 'array',
      items: [{
        type: 'number'
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, 2]
        `
    ],
    typescriptOnly: false,
    type: 'typescript'  // one of "functionality" | "maintainability" | "style" | "typescript"
  };

  public static FAILURE_STRING = 'function has too many parameters';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const walker = new MaxParamsRuleWalker(sourceFile, this.getOptions());
    return this.applyWithWalker(walker);
  }
}

class MaxParamsRuleWalker extends Lint.RuleWalker {
  protected visitArrowFunction(node: ts.ArrowFunction): void {
    if (node.parameters.length > 2) {
      this.getOptions().
      this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
    }
  }

  protected visitMethodDeclaration(node: ts.MethodDeclaration): void {
    if (node.parameters.length > 1) {
      this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
    }
  }

  protected visitFunctionDeclaration(node: ts.FunctionDeclaration): void {
    if (node.parameters.length > 1) {
      this.addFailure(this.createFailure(node.getStart(), node.getEnd(), Rule.FAILURE_STRING));
    }
  }
}
