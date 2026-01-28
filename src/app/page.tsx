'use client'

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { parseEther, formatEther } from 'viem'
import { INVERSE_VOTE_ADDRESS, INVERSE_VOTE_ABI, EMBER_ADDRESS, ERC20_ABI } from '@/lib/wagmi'
import { cn, formatNumber, shortenAddress } from '@/lib/utils'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <main className="min-h-dvh">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-amber-500 rotate-45" />
            <span className="font-mono text-lg tracking-tight">INVERSE<span className="text-amber-500">VOTE</span></span>
          </div>
          
          {isConnected ? (
            <button
              onClick={() => disconnect()}
              className="font-mono text-sm px-4 py-2 border border-zinc-700 hover:border-amber-500 hover:text-amber-500 transition-colors"
            >
              {shortenAddress(address!)}
            </button>
          ) : (
            <button
              onClick={() => connect({ connector: injected() })}
              className="font-mono text-sm px-4 py-2 bg-amber-500 text-black hover:bg-amber-400 transition-colors"
            >
              CONNECT
            </button>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-zinc-800 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Flip the <span className="text-amber-500">Plutocracy</span>
          </h1>
          <p className="mt-4 text-xl text-zinc-400 max-w-2xl text-pretty">
            Traditional DAOs: 1000× tokens = 1000× votes. Whales dominate.
            <br />
            InverseVote: 1000× tokens = <span className="text-amber-500 font-mono">31×</span> votes. Sqrt compression.
          </p>
          
          <div className="mt-8 flex gap-4">
            <a 
              href="https://basescan.org/address/0x1f89C93A3abd15b9D4F1dB830Ac8Ef81183231ff"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-4 py-2 border border-zinc-700 hover:border-amber-500 hover:text-amber-500 transition-colors"
            >
              VIEW CONTRACT →
            </a>
            <a 
              href="https://github.com/tedkaczynski-the-bot/inverse-vote"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-4 py-2 border border-zinc-700 hover:border-zinc-500 transition-colors"
            >
              GITHUB
            </a>
          </div>
        </div>
      </section>

      {/* Compression Visualization */}
      <section className="border-b border-zinc-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-sm text-zinc-500 mb-6">// COMPRESSION DEMO</h2>
          <CompressionDemo />
        </div>
      </section>

      {/* User Stats */}
      {isConnected && (
        <section className="border-b border-zinc-800 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-mono text-sm text-zinc-500 mb-6">// YOUR VOTING POWER</h2>
            <UserStats address={address!} />
          </div>
        </section>
      )}

      {/* Staking */}
      {isConnected && (
        <section className="border-b border-zinc-800 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-mono text-sm text-zinc-500 mb-6">// STAKE FOR TIME BONUS</h2>
            <StakingInterface address={address!} />
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-sm text-zinc-500 mb-6">// HOW IT WORKS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border border-zinc-800">
              <div className="font-mono text-amber-500 text-2xl mb-2">01</div>
              <h3 className="text-lg font-bold mb-2">Sqrt Compression</h3>
              <p className="text-zinc-400 text-sm text-pretty">
                Voting power = √(balance). A whale with 1M tokens gets 1000 votes, not 1M.
              </p>
            </div>
            <div className="p-6 border border-zinc-800">
              <div className="font-mono text-amber-500 text-2xl mb-2">02</div>
              <h3 className="text-lg font-bold mb-2">Time Bonus</h3>
              <p className="text-zinc-400 text-sm text-pretty">
                Stake tokens for up to 2× multiplier over 30 days. Rewards commitment.
              </p>
            </div>
            <div className="p-6 border border-zinc-800">
              <div className="font-mono text-amber-500 text-2xl mb-2">03</div>
              <h3 className="text-lg font-bold mb-2">Any ERC20</h3>
              <p className="text-zinc-400 text-sm text-pretty">
                Wrapper works with any token. Plug into existing governance systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-500">
          <span className="font-mono">Built by @tedkaczynski-the-bot</span>
          <span className="font-mono">Base Network</span>
        </div>
      </footer>
    </main>
  )
}

function CompressionDemo() {
  const [whaleTokens, setWhaleTokens] = useState(1000000)
  const [minnowTokens, setMinnowTokens] = useState(1000)

  const whalePower = Math.sqrt(whaleTokens)
  const minnowPower = Math.sqrt(minnowTokens)

  const tokenRatio = whaleTokens / minnowTokens
  const powerRatio = whalePower / minnowPower
  const compression = tokenRatio / powerRatio

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Inputs */}
      <div className="space-y-6">
        <div>
          <label className="font-mono text-xs text-zinc-500 block mb-2">WHALE TOKENS</label>
          <input
            type="range"
            min={10000}
            max={10000000}
            step={10000}
            value={whaleTokens}
            onChange={(e) => setWhaleTokens(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="font-mono text-2xl mt-2 tabular">{whaleTokens.toLocaleString()}</div>
        </div>
        <div>
          <label className="font-mono text-xs text-zinc-500 block mb-2">MINNOW TOKENS</label>
          <input
            type="range"
            min={1}
            max={10000}
            step={1}
            value={minnowTokens}
            onChange={(e) => setMinnowTokens(Number(e.target.value))}
            className="w-full accent-amber-500"
          />
          <div className="font-mono text-2xl mt-2 tabular">{minnowTokens.toLocaleString()}</div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-zinc-900 p-6 border border-zinc-800 relative overflow-hidden scanlines">
        <div className="relative z-10 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-500 text-sm">Token Ratio</span>
            <span className="font-mono text-xl tabular">{tokenRatio.toFixed(0)}×</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-zinc-500 text-sm">Voting Power Ratio</span>
            <span className="font-mono text-xl text-amber-500 tabular">{powerRatio.toFixed(1)}×</span>
          </div>
          <div className="border-t border-zinc-700 pt-4 flex justify-between items-baseline">
            <span className="text-zinc-500 text-sm">Compression Factor</span>
            <span className="font-mono text-2xl font-bold tabular">{compression.toFixed(1)}×</span>
          </div>
          
          {/* Visual bar comparison */}
          <div className="mt-6 space-y-3">
            <div>
              <div className="text-xs text-zinc-500 mb-1">Traditional (linear)</div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">InverseVote (sqrt)</div>
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300" 
                  style={{ width: `${(powerRatio / tokenRatio) * 100}%` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function UserStats({ address }: { address: `0x${string}` }) {
  const { data: emberBalance } = useReadContract({
    address: EMBER_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: votingPower } = useReadContract({
    address: INVERSE_VOTE_ADDRESS,
    abi: INVERSE_VOTE_ABI,
    functionName: 'getVotingPower',
    args: [address],
  })

  const { data: stakedBalance } = useReadContract({
    address: INVERSE_VOTE_ADDRESS,
    abi: INVERSE_VOTE_ABI,
    functionName: 'stakedBalance',
    args: [address],
  })

  const { data: timeMultiplier } = useReadContract({
    address: INVERSE_VOTE_ADDRESS,
    abi: INVERSE_VOTE_ABI,
    functionName: 'getTimeMultiplier',
    args: [address],
  })

  return (
    <div className="grid md:grid-cols-4 gap-4">
      <StatCard
        label="EMBER BALANCE"
        value={emberBalance ? formatNumber(emberBalance) : '—'}
        unit="EMBER"
      />
      <StatCard
        label="STAKED"
        value={stakedBalance ? formatNumber(stakedBalance) : '—'}
        unit="EMBER"
      />
      <StatCard
        label="VOTING POWER"
        value={votingPower ? formatNumber(votingPower) : '—'}
        unit="votes"
        highlight
      />
      <StatCard
        label="TIME MULTIPLIER"
        value={timeMultiplier ? `${(Number(timeMultiplier) / 1e18).toFixed(2)}` : '—'}
        unit="×"
      />
    </div>
  )
}

function StatCard({ 
  label, 
  value, 
  unit, 
  highlight 
}: { 
  label: string
  value: string
  unit: string
  highlight?: boolean 
}) {
  return (
    <div className={cn(
      "p-4 border",
      highlight ? "border-amber-500 bg-amber-500/5" : "border-zinc-800"
    )}>
      <div className="font-mono text-xs text-zinc-500 mb-1">{label}</div>
      <div className={cn(
        "font-mono text-2xl tabular",
        highlight && "text-amber-500"
      )}>
        {value}
      </div>
      <div className="text-xs text-zinc-600">{unit}</div>
    </div>
  )
}

function StakingInterface({ address }: { address: `0x${string}` }) {
  const [amount, setAmount] = useState('')
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake')

  const { data: emberBalance } = useReadContract({
    address: EMBER_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: stakedBalance } = useReadContract({
    address: INVERSE_VOTE_ADDRESS,
    abi: INVERSE_VOTE_ABI,
    functionName: 'stakedBalance',
    args: [address],
  })

  const { data: allowance } = useReadContract({
    address: EMBER_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [address, INVERSE_VOTE_ADDRESS],
  })

  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const needsApproval = mode === 'stake' && allowance !== undefined && amount && parseEther(amount) > allowance

  const handleApprove = () => {
    writeContract({
      address: EMBER_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [INVERSE_VOTE_ADDRESS, parseEther(amount || '0')],
    })
  }

  const handleStake = () => {
    writeContract({
      address: INVERSE_VOTE_ADDRESS,
      abi: INVERSE_VOTE_ABI,
      functionName: 'stake',
      args: [parseEther(amount || '0')],
    })
  }

  const handleUnstake = () => {
    writeContract({
      address: INVERSE_VOTE_ADDRESS,
      abi: INVERSE_VOTE_ABI,
      functionName: 'unstake',
      args: [parseEther(amount || '0')],
    })
  }

  const maxAmount = mode === 'stake' ? emberBalance : stakedBalance

  return (
    <div className="max-w-md">
      {/* Mode Toggle */}
      <div className="flex mb-4">
        <button
          onClick={() => setMode('stake')}
          className={cn(
            "flex-1 font-mono text-sm py-2 border transition-colors",
            mode === 'stake' 
              ? "border-amber-500 bg-amber-500/10 text-amber-500" 
              : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
          )}
        >
          STAKE
        </button>
        <button
          onClick={() => setMode('unstake')}
          className={cn(
            "flex-1 font-mono text-sm py-2 border-t border-b border-r transition-colors",
            mode === 'unstake' 
              ? "border-amber-500 bg-amber-500/10 text-amber-500" 
              : "border-zinc-800 text-zinc-500 hover:text-zinc-300"
          )}
        >
          UNSTAKE
        </button>
      </div>

      {/* Amount Input */}
      <div className="relative mb-4">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full bg-zinc-900 border border-zinc-800 px-4 py-3 font-mono text-xl focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          onClick={() => setAmount(maxAmount ? formatEther(maxAmount) : '0')}
          className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-zinc-500 hover:text-amber-500 transition-colors"
        >
          MAX
        </button>
      </div>

      {/* Available */}
      <div className="text-sm text-zinc-500 mb-4">
        Available: <span className="font-mono tabular">{maxAmount ? formatNumber(maxAmount) : '0'}</span> EMBER
      </div>

      {/* Action Button */}
      {needsApproval ? (
        <button
          onClick={handleApprove}
          disabled={isPending || isConfirming}
          className="w-full font-mono text-sm py-3 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {isPending || isConfirming ? 'APPROVING...' : 'APPROVE EMBER'}
        </button>
      ) : (
        <button
          onClick={mode === 'stake' ? handleStake : handleUnstake}
          disabled={isPending || isConfirming || !amount}
          className="w-full font-mono text-sm py-3 bg-amber-500 text-black hover:bg-amber-400 transition-colors disabled:opacity-50"
        >
          {isPending || isConfirming 
            ? (mode === 'stake' ? 'STAKING...' : 'UNSTAKING...') 
            : (mode === 'stake' ? 'STAKE EMBER' : 'UNSTAKE EMBER')}
        </button>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="mt-4 p-3 border border-green-500/50 bg-green-500/10 text-green-400 text-sm font-mono">
          Transaction confirmed ✓
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 text-sm text-zinc-500">
        <p className="text-pretty">
          Staking earns a time bonus: 1× at day 0, up to 2× after 30 days. 
          Fully unstaking resets your bonus.
        </p>
      </div>
    </div>
  )
}
