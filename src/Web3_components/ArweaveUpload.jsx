import { WebBundlr } from "@bundlr-network/client";
// import { providers } from "ethers"

const ArweaveUpload = async (provider, file) => {
  const [bundlrInstance, setBundlrInstance] = useState(null);
  const bundlr = new WebBundlr(
    "https://node1.bundlr.network",
    "matic",
    provider
  );
  await bundlr.ready();

  setBundlrInstance(bundlr);
  //     const transaction = bundlrInstance.createTransaction(data, { tags })

  //   await transaction.sign()
  //   await transaction.upload()
  let response = await bundlr.uploadFile(file);

  return response;
};

export default ArweaveUpload;
