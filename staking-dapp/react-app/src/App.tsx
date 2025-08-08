import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { WagmiProvider, useConnect} from 'wagmi'
import { config } from './config'
import { } from "wagmi";

import {WagmiProvider, useAccount, useConnect, useDisconnect } from 'wagmi'

export function AppBar() {
  const { address } = useAccount()

  return <div className='flex justify-between p-2 m-2'>
    <div className='text-2xl'>
      <h1>Wagmi</h1>
    </div>
    <div>
        {!address ? <Connectors /> : <Disconnect />}
    </div>
  </div>
}

function Connectors() {
    const { connectors, connect } = useConnect()
    return connectors.map((connector) => (
        <button className='mx-2 border rounded p-2' key={connector.uid} onClick={() => connect({ connector })}>
        {connector.name}
        </button>
    ))
}

function Disconnect() {
    const {disconnect} = useDisconnect();
    
    return <div>
        <button className='mx-2 border rounded p-2' onClick={() => disconnect()}>
            Disconnect wallet
        </button>
    </div>

}


const queryClient = new QueryClient();
export default function App() {
  return (
  <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}> 
          <AppBar/>
       </QueryClientProvider> 
     </WagmiProvider>
  )

}
