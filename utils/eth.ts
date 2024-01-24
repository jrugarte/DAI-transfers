export function formatEthAddress(ethAddress: string): string {
  // Check if the input address is a valid Ethereum address (basic validation)
  if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
    throw new Error("Invalid Ethereum address");
  }

  // Extract the first 5 and last 5 letters of the address
  const firstFive = ethAddress.slice(0, 5);
  const lastFive = ethAddress.slice(-5);

  // Combine and format the result
  const formattedAddress = `${firstFive}....${lastFive}`;
  return formattedAddress;
}
