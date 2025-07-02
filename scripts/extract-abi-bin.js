// scripts/extract-abi-bin.js
const fs = require('fs');
const path = require('path');

// Output folder for ABIs and bytecodes
const outputDir = path.resolve(__dirname, '../abi');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// List of contract names
const contracts = ['SWSStaking', 'SWSToken', 'DOLToken'];

contracts.forEach(name => {
    const artifactPath = path.resolve(__dirname, `../artifacts-zk/contracts/${name}.sol/${name}.json`);
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf-8'));

    // Save ABI
    const abiPath = path.join(outputDir, `${name}.abi.json`);
    fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));

    // Save Bytecode (wrapped format)
    const bytecodePath = path.join(outputDir, `${name}.bytecode.json`);
    fs.writeFileSync(bytecodePath, JSON.stringify({ bytecode: artifact.bytecode }, null, 2));

    console.log(`✅ Saved: ${name}.abi.json and ${name}.bytecode.json`);
});

