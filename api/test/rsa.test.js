const { generateRsaKeyPair } = require('./src/utils/crypto.util');

const sleep = ms => (
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
);

const main = async () => {
  try {
    const { privateKey, publicKey } = await generateRsaKeyPair();
    console.log(privateKey);
    console.log(publicKey);
    await sleep(5000);
    const { privateKey: privateKey2, publicKey: publicKey2 } = await generateRsaKeyPair();
    console.log(privateKey2);
    console.log(publicKey2);
  } catch (error) {
    console.log(error);
  }
};

main();
