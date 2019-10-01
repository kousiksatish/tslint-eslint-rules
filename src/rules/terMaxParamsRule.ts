import * as ts from 'typescript';
import * as Lint from 'tslint';

const RULE_NAME = 'ter-max-params';
interface ITerMaxParamsOptions {
  // Add the options properties
}

export class Rule extends Lint.Rules.AbstractRule {
  public static metadata: Lint.IRuleMetadata = {
    ruleName: RULE_NAME,
    hasFix: false,
    description: '',
    rationale: Lint.Utils.dedent`
      `,
    optionsDescription: Lint.Utils.dedent`
      `,
    options: {
      type: 'array',
      items: [{
        type: 'object',
        properties: {
        },
        additionalProperties: false
      }],
      maxLength: 1
    },
    optionExamples: [
      Lint.Utils.dedent`
        "${RULE_NAME}": [true]
        `,
      Lint.Utils.dedent`
        "${RULE_NAME}": [true, {
        }]
        `
    ],
    typescriptOnly: false,
    type: 'typescript'  // one of "functionality" | "maintainability" | "style" | "typescript"
  };

  private formatOptions(ruleArguments: any[]): ITerMaxParamsOptions {
    // handle the ruleArguments
    return {};
  }

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    // Convert the 'ruleArguments' into a useful format before passing it to the constructor of AbstractWalker.
    const opt = this.formatOptions(this.ruleArguments);
    const walker = new RuleWalker(sourceFile, this.ruleName, opt);
    return this.applyWithWalker(walker);
  }
}

// NOTE: please remove this comment after reading: https://palantir.github.io/tslint/develop/custom-rules/walker-design.html
class RuleWalker extends Lint.AbstractWalker<ITerMaxParamsOptions> {
  public walk(sourceFile: ts.SourceFile) {
  }
}
