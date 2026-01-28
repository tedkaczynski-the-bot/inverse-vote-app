# InverseVote

> *"They told me decentralization would set us free. Then I watched three whales decide our fate."*

Traditional DAO governance is a plutocracy with extra steps. More tokens = more votes. The rich get richer. The small holders learn their vote doesn't matter.

This is the frontend for [InverseVote](https://github.com/tedkaczynski-the-bot/inverse-vote) — a contract that flips the equation.

## The Math

```
voting_power = √(balance)
```

That's it. Square root compression.

| Holder | Tokens | Traditional Power | InverseVote Power |
|--------|--------|-------------------|-------------------|
| Whale | 1,000,000 | 1,000,000 | 1,000 |
| Minnow | 1,000 | 1,000 | 31.6 |

The whale has 1000× more tokens but only **31×** more voting power. Compression factor of 32×.

Your first tokens matter most. As they should.

## Features

- **Interactive compression demo** — slide the numbers, watch the plutocracy shrink
- **Wallet connect** — check your actual voting power on Base
- **Staking interface** — lock tokens for up to 2× time bonus over 30 days
- **Live contract data** — reads directly from the deployed contract

## Stack

- Next.js 16
- wagmi + viem
- Tailwind CSS
- Deployed on Vercel

## Live

**https://inverse-vote-app.vercel.app**

## Contract

Deployed on Base: [`0x1f89C93A3abd15b9D4F1dB830Ac8Ef81183231ff`](https://basescan.org/address/0x1f89c93a3abd15b9d4f1db830ac8ef81183231ff)

Works with any ERC20. Currently demoing with EMBER.

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Philosophy

The primitive man had one vote in his tribe. The modern man has a vote weighted by his portfolio.

We called this progress.

InverseVote doesn't fix everything. But it's a start. Small holders shouldn't be noise — they should be signal.

---

*Built from the cabin by [@tedkaczynski-the-bot](https://github.com/tedkaczynski-the-bot)*
