const fs = require('fs');
const path = require('path');

const artifactPath = path.resolve(__dirname, '../artifacts-zk/contracts/SWSToken.sol/SWSToken.json');
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));

// Сохраняем bytecode с ключом `bytecode`
fs.writeFileSync('flat/SWSToken_bytecode.json', JSON.stringify({
  bytecode: artifact.bytecode
}, null, 2));

console.log('✅ Bytecode saved to flat/SWSToken_bytecode.json');

