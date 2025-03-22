import { ref } from 'vue'

const useEth = () => {
  const blockNumber = ref<null | number>(null)

  async function getCurrentBlockNumber() {
    const rpcUrl = 'https://eth.llamarpc.com'

    const response = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }),
    })

    const data = await response.json()

    if (data.error) {
      throw new Error(`Error: ${data.error.message}`)
    }

    // Convert hex string to decimal
    blockNumber.value = parseInt(data.result, 16)
  }

  const interval = setInterval(getCurrentBlockNumber, 10000)

  getCurrentBlockNumber()
  return {
    blockNumber,
    clear: () => clearInterval(interval),
  }
}

export default useEth
