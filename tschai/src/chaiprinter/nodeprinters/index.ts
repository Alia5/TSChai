import { nodePrinters } from './nodeprinter';

require('./arrowFunctionPrinter');
require('./binaryExpressionPrinter');
require('./blockPrinter');
require('./emptyStatementPrinter');
require('./equalsEqualsEqualsTokenPrinter');
require('./exclamationEqualsEqualsTokenPrinter');
require('./expressionStatementPrinter');
require('./functionDeclarationPrinter');
require('./ifStatementPrinter');
require('./returnStatementPrinter');
require('./stringLiteralPrinter');
require('./templateExpressionPrinter');
require('./variableStatementPrinter');

export default nodePrinters;