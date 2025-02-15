<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=1000&size=55&pause=1000&center=true&vCenter=true&width=1000&lines=Buzzing;  Predict+Bet+Earn+Rewards" alt="Typing SVG" /></a>
<br/> <br/> 

 <br/> <br/>
# Buzzing

### Prediction markets like Polymarket have skyrocketed in usage this year thanks to politics and sports betting. But what if there was a prediction market focused on social media and the internet arena?

### We're building a decentralized, blockchain-powered platform that enables users to bet on the future popularity of content creators by predicting a unique engagement score—one that's calculated in real time from data across platforms like LinkedIn, GitHub, Farcaster, and Discord, and then verified by an AI agent using natural language processing and machine learning to ensure accuracy and detect anomalies.**

## Key Features
### Here are the BuzzyFI features in point form:
- **Monetize Your Existing Reels:** Turn your current reels into revenue-generating content.
- **Upload Custom Reels:** Share and monetize your own custom-created reels.
- **Invest in Favorite Creators' Reels:** Place an investment amount on your favorite content creators' reels for a specific tenure.
- **Withdraw Rewards:** Redeem your earnings once the investment tenure is complete.
- **Earn BuzziFy Tokens:** Gain BuzziFy tokens through a "Refer and Earn" program.
- **Innovative Prediction Model:** Users wager on a precise engagement score, not just a binary outcome.
- **Decentralized and Transparent:** Built on blockchain for trust and security.
- **Advanced AI Integration:** Processes real-time data to ensure accurate and reliable predictions.
- **Robust Verification:** Utilizes zkTLS to secure and verify betting outcomes.
- **Wide Target Audience:** Appeals to all users aged 16 and up with low entry barriers.
- **Community-Driven Growth:** Allows users to create their own pools for a nominal fee.
- **Clear Market Gap:** No existing project focuses on range-based betting or content creator engagement derivatives.

## Technical Architecture
<img width="1214" alt="Screenshot 2024-08-07 at 10 07 16 AM" src="https://quickest-reaction-568.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F12ef41c4-7fad-45c1-9929-2146ee112899%2Fa205bfa7-9207-459f-9792-966cc5e6d325%2FScreenshot_2024-09-26_162333.png?table=block&id=67b94f75-748f-4d7d-8219-41f47fdd1415&spaceId=12ef41c4-7fad-45c1-9929-2146ee112899&width=1420&userId=&cache=v2">

<a href="https://excalidraw.com/#json=2IszvIRZKWLMC_SnU6xDN,Ko3NXJEpdHlUn-X2P7jGTA">View Archtecuture</a>

## TechStack

- Next.js
- Typescript
- Tailwind CSS
- Solidity
- EVM Network
- ZKTLS , Meta LLaMA module produces questions based on the context



## End-to-End Data Flow Summary

- **Twitter Data Fetch**: Twitter API fetches posts and profile data.
- **Data Preprocessing**: Context extraction, cleaning, and structuring.
- **Question Generation**: Meta LLaMA module produces questions based on the context.
- **Decentralized Scraping & Verification**: Pool over ZKTLS collects additional data, ensuring integrity.
- **Prediction Processing**: The Prediction Engine processes verified data and generates outcomes.
- **Smart Contract Execution**: Smart contracts distribute funds based on the predictions.
- **Monitoring & Feedback**: Continuous system monitoring and feedback refine the overall process.


## Challenges and Solution
- Inadequate Rewards for User Engagement
    - Problem: Despite contributing valuable content and engagement, users receive little to no tangible rewards for their participation on most social media platforms.
- Barrier to Monetization for Small Creators
    - Many small creators struggle to monetize their content effectively due to high entry barriers and the dominance of established influencers.
- Time and Effort Not Valued
    - Users spend significant time and effort creating and engaging with content but often feel that their contributions are undervalued.

  
| **Contract Name**   | **Contract Address**                                   | **URL**                                                                                  |
|---------------------|--------------------------------------------------------|------------------------------------------------------------------------------------------|
| Token Contract      | 0x09788a0B60eCCd3FE8B951e181B2391e177dFdab             | [MantleScan](https://sepolia.mantlescan.io/address/0x09788a0B60eCCd3FE8B951e181B2391e177dFdab) |
| Main Contract       | 0x8Fc89849cdd463c9d75a9973C9683064FAa887e4             | [MantleScan](https://sepolia.mantlescan.io/address/0x8Fc89849cdd463c9d75a9973C9683064FAa887e4) |
| NFT Contract        | 0x371907DA46F9771189C068864115a4e84a227469             | [MantleScan](https://sepolia.mantlescan.io/address/0x371907DA46F9771189C068864115a4e84a227469) |
| USDE Contract       | 0xF9173645D5A391d9Fb29Fc3438024499E3AC5eD0             | [MantleScan](https://sepolia.mantlescan.io/address/0xF9173645D5A391d9Fb29Fc3438024499E3AC5eD0) |


## Contract Overview : 

| **Function**                | **Visibility** | **Parameters**                                                                 | **Explanation**                                                                                                                                                                                                                                    |
|-----------------------------|----------------|-------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `constructor(address _token)`| `external`     | `_token`: address of the ERC20 token to be used for betting                    | Initializes the contract by setting the token address and the owner to the message sender.                                                                                                                                                        |
| `createPool()`               | `external`     | None                                                                          | Allows the owner to create a new betting pool with a specified end time (5 minutes from creation). The pool is assigned an ID, and the pool's initial parameters (amount, bets, end time) are set.                                                  |
| `placeBet(uint256 _amount, uint256 _targetScore, uint256 _pool_id)`| `external` | `_amount`: amount of tokens to bet, `_targetScore`: predicted score, `_pool_id`: ID of the pool| Allows users to place a bet on a specific pool by providing the amount of tokens and target score. The bet is only accepted if it’s within the pool's betting period, and users haven't already placed a bet. Transfers tokens to the contract.     |
| `setResult(uint256 _pool_id, uint256 _finalScore)` | `external`    | `_pool_id`: ID of the pool, `_finalScore`: final score of the pool             | Allows the owner to set the final result of the pool after the betting period ends. This function ends the pool and initiates the reward calculation for the bets based on their accuracy.                                                          |
| `_calculationReward(uint256 _pool_id)` | `private`      | `_pool_id`: ID of the pool                                                   | Calculates the reward for each bet based on its accuracy compared to the final score. Uses a weighted accuracy formula to proportionally distribute rewards from the pool among participants.                                                      |
| `claimBet(uint _pool_id)`    | `external`     | `_pool_id`: ID of the pool                                                    | Allows users to claim their reward if they placed a bet in the pool and their claimable reward is greater than zero. Ensures that the pool has ended before claiming. Tokens are transferred to the user upon successful claim.                    |
| `withdraw(uint256 amount, address _receiver)` | `external`    | `amount`: amount to withdraw, `_receiver`: address to receive the funds        | Allows the owner to withdraw unclaimed tokens from the contract. Transfers a specified amount of tokens to a designated receiver address.                                                                                                          |

## Key Concepts
- **Betting Pools**: A pool where users can place bets based on their prediction of a score.
- **Bet**: Contains user info, bet amount, target score, and whether the bet has been claimed.
- **Final Score**: The actual outcome of the event, which is compared to users' target scores.
- **Reward Calculation**: Based on the accuracy of users' predictions, with more accurate bets getting a higher portion of the total pool.

## Events

- **BetPlaced**: Emitted when a user places a bet in a pool.
- **BetClaimed**: Emitted when a user successfully claims their reward.

---








