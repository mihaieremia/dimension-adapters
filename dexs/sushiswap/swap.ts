import { FetchResultV2, FetchV2 } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";
import { httpGet } from "../../utils/fetchURL";

const ROUTE_RP45_EVENT = 'event Route(address indexed from, address to, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOutMin,uint256 amountOut)'
const ROUTE_RP6_EVENT = 'event Route(address indexed from, address to, address indexed tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, uint256 amountOut, int256 slippage, uint32 indexed referralCode)'
const ROUTE_RP7_EVENT = 'event Route(address indexed from, address to, address indexed tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut, int256 slippage, uint32 indexed referralCode)'

const CHAIN_ID = {
  [CHAIN.ETHEREUM]: 1,
  [CHAIN.ARBITRUM]: 42161,
  [CHAIN.OPTIMISM]: 10,
  [CHAIN.BASE]: 8453,
  [CHAIN.POLYGON]: 137,
  [CHAIN.AVAX]: 43114,
  [CHAIN.BSC]: 56,
  [CHAIN.LINEA]: 59144,
  [CHAIN.ARBITRUM_NOVA]: 42170,
  [CHAIN.XDAI]: 100,
  [CHAIN.FANTOM]: 250,
  [CHAIN.BITTORRENT]: 199,
  [CHAIN.CELO]: 42220,
  [CHAIN.FILECOIN]: 314,
  [CHAIN.HAQQ]: 11235,
  [CHAIN.KAVA]: 2222,
  [CHAIN.METIS]: 1088,
  [CHAIN.THUNDERCORE]: 108,
  [CHAIN.SCROLL]: 534352,
  [CHAIN.ZETA]: 7000,
  [CHAIN.MOONBEAM]: 1284,
  [CHAIN.MOONRIVER]: 1285,
  [CHAIN.POLYGON_ZKEVM]: 1101,
  [CHAIN.FUSE]: 122,
  [CHAIN.HARMONY]: 1666600000,
  [CHAIN.TELOS]: 40,
  [CHAIN.BOBA]: 288,
  [CHAIN.BOBA_BNB]: 56288,
  [CHAIN.CORE]: 1116,
  [CHAIN.CRONOS]: 81457,
  [CHAIN.BLAST]: 81457,
  [CHAIN.SKALE_EUROPA]: 2046399126,
  [CHAIN.ROOTSTOCK]: 30,
  [CHAIN.MANTLE]: 5000,
  [CHAIN.ERA]: 324,
  [CHAIN.MANTA]: 169,
  [CHAIN.MODE]: 34443,
  [CHAIN.TAIKO]: 167000,
  [CHAIN.ZKLINK]: 810180,
  [CHAIN.APECHAIN]: 33139,
  [CHAIN.SONIC]: 146,
  [CHAIN.HEMI]: 43111,
}

const RP4_ADDRESS = {
  [CHAIN.ETHEREUM]: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
  [CHAIN.ARBITRUM]: '0x544bA588efD839d2692Fc31EA991cD39993c135F',
  [CHAIN.OPTIMISM]: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
  [CHAIN.BASE]: '0x0389879e0156033202c44bf784ac18fc02edee4f',
  [CHAIN.POLYGON]: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
  [CHAIN.AVAX]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.BSC]: '0x33d91116e0370970444B0281AB117e161fEbFcdD',
  [CHAIN.LINEA]: '0x46b3fdf7b5cde91ac049936bf0bdb12c5d22202e',
  [CHAIN.ARBITRUM_NOVA]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.XDAI]: '0x46b3fdf7b5cde91ac049936bf0bdb12c5d22202e',
  [CHAIN.FANTOM]: '0x46b3fdf7b5cde91ac049936bf0bdb12c5d22202e',
  [CHAIN.BITTORRENT]: '0x93c31c9C729A249b2877F7699e178F4720407733',
  [CHAIN.CELO]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.FILECOIN]: '0x1f2FCf1d036b375b384012e61D3AA33F8C256bbE',
  [CHAIN.HAQQ]: '0xc3Ec4e1511c6935ed2F92b9A61881a1B95bB1566',
  [CHAIN.KAVA]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [CHAIN.METIS]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [CHAIN.THUNDERCORE]: '0x57bfFa72db682f7eb6C132DAE03FF36bBEB0c459',
  [CHAIN.SCROLL]: '0x734583f62Bb6ACe3c9bA9bd5A53143CA2Ce8C55A',
  [CHAIN.ZETA]: '0x640129e6b5C31B3b12640A5b39FECdCa9F81C640',
  [CHAIN.MOONBEAM]: '0xB45e53277a7e0F1D35f2a77160e91e25507f1763',
  [CHAIN.MOONRIVER]: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
  [CHAIN.POLYGON_ZKEVM]: '0x57bfFa72db682f7eb6C132DAE03FF36bBEB0c459',
  [CHAIN.FUSE]: '0x46B3fDF7b5CDe91Ac049936bF0bDb12c5d22202e',
  [CHAIN.HARMONY]: '0x9B3336186a38E1b6c21955d112dbb0343Ee061eE',
  [CHAIN.TELOS]: '0x1400feFD6F9b897970f00Df6237Ff2B8b27Dc82C',
  [CHAIN.BOBA]: '0xe43ca1Dee3F0fc1e2df73A0745674545F11A59F5',
  [CHAIN.BOBA_BNB]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.CORE]: '0x0389879e0156033202C44BF784ac18fC02edeE4f',
  [CHAIN.CRONOS]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.BLAST]: '0xCdBCd51a5E8728E0AF4895ce5771b7d17fF71959',
  [CHAIN.SKALE_EUROPA]: '0xbA61F775730C0a3E3361717195ee86785ee33055',
  [CHAIN.ROOTSTOCK]: '0xb46e319390De313B8cc95EA5aa30C7bBFD79Da94',
}

const RP5_ADDRESS = {
  [CHAIN.ETHEREUM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ARBITRUM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.OPTIMISM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BASE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.POLYGON]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.AVAX]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BSC]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.LINEA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ARBITRUM_NOVA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.XDAI]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.FANTOM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BITTORRENT]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.CELO]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.FILECOIN]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.HAQQ]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.KAVA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.METIS]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.THUNDERCORE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.SCROLL]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ZETA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.MOONBEAM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.MOONRIVER]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.POLYGON_ZKEVM]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.FUSE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.HARMONY]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.TELOS]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BOBA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BOBA_BNB]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.CORE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.CRONOS]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.BLAST]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.SKALE_EUROPA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ROOTSTOCK]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.MANTLE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ERA]: '0x9e55e562D40FD01f38cD4057e632352fE0758F16',
  [CHAIN.MANTA]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.MODE]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.TAIKO]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
  [CHAIN.ZKLINK]: '0x9e55e562D40FD01f38cD4057e632352fE0758F16',
  [CHAIN.APECHAIN]: '0xf2614A233c7C3e7f08b1F887Ba133a13f1eb2c55',
}

const RP6_ADDRESS = {
  [CHAIN.ETHEREUM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ARBITRUM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.OPTIMISM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BASE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.POLYGON]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.AVAX]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BSC]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.LINEA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ARBITRUM_NOVA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.XDAI]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.FANTOM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BITTORRENT]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.CELO]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.FILECOIN]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.HAQQ]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.KAVA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.METIS]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.THUNDERCORE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.SCROLL]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ZETA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.MOONBEAM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.MOONRIVER]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.POLYGON_ZKEVM]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.FUSE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.HARMONY]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.TELOS]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BOBA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BOBA_BNB]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.CORE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.CRONOS]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.BLAST]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.SKALE_EUROPA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ROOTSTOCK]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ERA]: '0xE6fD46600A97CE06703b58333B9C2399F4bF6FEc',
  [CHAIN.MANTLE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.MANTA]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.MODE]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.TAIKO]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.ZKLINK]: '0xE6fD46600A97CE06703b58333B9C2399F4bF6FEc',
  [CHAIN.APECHAIN]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.SONIC]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71',
  [CHAIN.HEMI]: '0x85CD07Ea01423b1E937929B44E4Ad8c40BbB5E71'
}

const RP7_ADDRESS = {
  [CHAIN.ETHEREUM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ARBITRUM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.OPTIMISM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BASE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.POLYGON]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.AVAX]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BSC]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.LINEA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ARBITRUM_NOVA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.XDAI]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.FANTOM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BITTORRENT]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.CELO]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.FILECOIN]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.HAQQ]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.KAVA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.METIS]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.THUNDERCORE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.SCROLL]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ZETA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.MOONBEAM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.MOONRIVER]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.POLYGON_ZKEVM]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.FUSE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.HARMONY]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.TELOS]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BOBA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BOBA_BNB]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.CORE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.CRONOS]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.BLAST]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.SKALE_EUROPA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ROOTSTOCK]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ERA]: '0xd7C94C8C61628911C41141289af1D0dE17d7aC8d',
  [CHAIN.MANTLE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.MANTA]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.MODE]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.TAIKO]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.ZKLINK]: '0xd7C94C8C61628911C41141289af1D0dE17d7aC8d',
  [CHAIN.APECHAIN]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.SONIC]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C',
  [CHAIN.HEMI]: '0x3Ced11c610556e5292fBC2e75D68c3899098C14C'
}

const WNATIVE_ADDRESS = {
  [CHAIN.ETHEREUM]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  [CHAIN.ARBITRUM]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
  [CHAIN.OPTIMISM]: '0x4200000000000000000000000000000000000006',
  [CHAIN.BASE]: '0x4200000000000000000000000000000000000006',
  [CHAIN.POLYGON]: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
  [CHAIN.AVAX]: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
  [CHAIN.BSC]: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  [CHAIN.LINEA]: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
  [CHAIN.ARBITRUM_NOVA]: '0x722e8bdd2ce80a4422e880164f2079488e115365',
  [CHAIN.XDAI]: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
  [CHAIN.FANTOM]: '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  [CHAIN.BITTORRENT]: '0x23181f21dea5936e24163ffaba4ea3b316b57f3c',
  [CHAIN.CELO]: '0x471ece3750da237f93b8e339c536989b8978a438',
  [CHAIN.FILECOIN]: '0x60e1773636cf5e4a227d9ac24f20feca034ee25a',
  [CHAIN.HAQQ]: '0xec8cc083787c6e5218d86f9ff5f28d4cc377ac54',
  [CHAIN.KAVA]: '0xc86c7c0efbd6a49b35e8714c5f59d99de09a225b',
  [CHAIN.METIS]: '0x75cb093e4d61d2a2e65d8e0bbb01de8d89b53481',
  [CHAIN.THUNDERCORE]: '0x413cefea29f2d07b8f2acfa69d92466b9535f717',
  [CHAIN.SCROLL]: '0x5300000000000000000000000000000000000004',
  [CHAIN.ZETA]: '0x5f0b1a82749cb4e2278ec87f8bf6b618dc71a8bf',
  [CHAIN.MOONBEAM]: '0xacc15dc74880c9944775448304b263d191c6077f',
  [CHAIN.MOONRIVER]: '0xf50225a84382c74cbdea10b0c176f71fc3de0c4d',
  [CHAIN.POLYGON_ZKEVM]: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
  [CHAIN.FUSE]: '0x0be9e53fd7edac9f859882afdda116645287c629',
  [CHAIN.HARMONY]: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
  [CHAIN.TELOS]: '0xd102ce6a4db07d247fcc28f366a623df0938ca9e',
  [CHAIN.BOBA]: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000',
  [CHAIN.BOBA_BNB]: '0xc58aad327d6d58d979882601ba8dda0685b505ea',
  [CHAIN.CORE]: '0x40375c92d9faf44d2f9db9bd9ba41a3317a2404f',
  [CHAIN.CRONOS]: '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23',
  [CHAIN.BLAST]: '0x4300000000000000000000000000000000000004',
  [CHAIN.SKALE_EUROPA]: '0x0000000000000000000000000000000000000000',
  [CHAIN.ROOTSTOCK]: '0x542fda317318ebf1d3deaf76e0b632741a7e677d',
  [CHAIN.MANTLE]: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
  [CHAIN.ERA]: '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
  [CHAIN.MANTA]: '0x0dc808adce2099a9f62aa87d9670745aba741746',
  [CHAIN.MODE]: '0x4200000000000000000000000000000000000006',
  [CHAIN.TAIKO]: '0xa51894664a773981c6c112c43ce576f315d5b1b6',
  [CHAIN.ZKLINK]: '0x8280a4e7d5b3b658ec4580d3bc30f5e50454f169',
  [CHAIN.APECHAIN]: '0x48b62137edfa95a428d35c09e44256a739f6b557',
  [CHAIN.SONIC]: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38',
  [CHAIN.HEMI]: '0x4200000000000000000000000000000000000006'
}

const useSushiAPIPrice = (chain) => [
  CHAIN.BOBA_BNB,
  CHAIN.MOONRIVER
].includes(chain)

interface Log {
  tokenIn: string;
  amountIn: string;
}

const fetch: FetchV2 = async ({ getLogs, createBalances, chain }): Promise<FetchResultV2> => {
  const logsPromises: Promise<Log[]>[] = []

  if (RP4_ADDRESS[chain]) {
    logsPromises.push(getLogs({ target: RP4_ADDRESS[chain], eventAbi: ROUTE_RP45_EVENT }))
  }
  if (RP5_ADDRESS[chain]) {
    logsPromises.push(getLogs({ target: RP5_ADDRESS[chain], eventAbi: ROUTE_RP45_EVENT }))
  }
  if (RP6_ADDRESS[chain]) {
    logsPromises.push(getLogs({ target: RP6_ADDRESS[chain], eventAbi: ROUTE_RP6_EVENT }))
  }
  if (RP7_ADDRESS[chain]) {
    logsPromises.push(getLogs({ target: RP7_ADDRESS[chain], eventAbi: ROUTE_RP7_EVENT }))
  }

  const logs = (await Promise.all(logsPromises)).flat()

  if (useSushiAPIPrice(chain)) {
    const dailyVolume = createBalances()
    const tokenPrice = Object.entries(await httpGet(`https://api.sushi.com/price/v1/${CHAIN_ID[chain]}`)).reduce((acc, [key, value]) => {
      acc[key.toLowerCase()] = value
      return acc
    });
    const tokensIn =  [...new Set(logs.map(log => log.tokenIn.toLowerCase()))]
    const tokensInfo = (await Promise.all(tokensIn.map(token => httpGet(`https://api.sushi.com/token/v1/${CHAIN_ID[chain]}/${token}`)))).flat();

    const tokens = tokensInfo.reduce((tokens, token) => {
      const address = token.address.toLowerCase()
      tokens[address] = {
        ...token,
        price: tokenPrice[address] ?? 0
      }

      return tokens
    }, {});

    logs.forEach((log) => {
      const token = tokens[log.tokenIn.toLowerCase()]
      if (token && log.tokenIn !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE') {
        const _dailyVolume = Number(log.amountIn) * token.price / 10 ** token.decimals
        if (_dailyVolume < 0) throw new Error(`Daily volume cannot be negative. Current value: ${_dailyVolume}`)
        dailyVolume.addUSDValue(_dailyVolume)
      } else {
        if (Number(log.amountIn) < 0) throw new Error(`Amount cannot be negative. Current value: ${log.amountIn}`)
        dailyVolume.add(WNATIVE_ADDRESS[chain], log.amountIn)
      }
    })

    return { dailyVolume }
  } else {
    const dailyVolume = createBalances()

    logs.forEach((log) => {
      if (Number(log.amountIn) < 0) throw new Error(`Amount cannot be negative. Current value: ${log.amountIn}`)
      if (log.tokenIn === '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE')
        dailyVolume.addGasToken(log.amountIn)
      else
        dailyVolume.add(log.tokenIn, log.amountIn)
    })

    return { dailyVolume }
  }
}

const adapters = {
  [CHAIN.ARBITRUM]: {
    fetch,
    start: '2024-02-25',
  },
  [CHAIN.ARBITRUM_NOVA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.AVAX]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.BASE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.BLAST]: {
    fetch,
    start: '2024-03-01'
  },
  [CHAIN.BOBA]: {
    fetch,
    start: '2024-03-22'
  },
  [CHAIN.BOBA_BNB]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.BSC]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.BITTORRENT]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.CELO]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.CORE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.ETHEREUM]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.FANTOM]: {
    fetch,
    start: '2024-02-25'
  },
  // [CHAIN.FILECOIN]: {
  //   fetch,
  //   start: '2024-02-25'
  // },
  [CHAIN.FUSE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.XDAI]: {
    fetch,
    start: '2024-02-25'
  },
  // [CHAIN.HAQQ]: {
  //   fetch,
  //   start: '2024-02-25'
  // },
  // [CHAIN.HARMONY]: {
  //   fetch,
  //   start: '2024-02-25'
  // },
  [CHAIN.KAVA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.LINEA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.METIS]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.MOONBEAM]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.MOONRIVER]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.OPTIMISM]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.POLYGON]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.POLYGON_ZKEVM]: {
    fetch,
    start: '2024-02-25'
  },
  // [CHAIN.ROOTSTOCK]: {
  //   fetch,
  //   start: '2024-05-21'
  // },
  [CHAIN.SCROLL]: {
    fetch,
    start: '2024-02-25'
  },
  // [CHAIN.SKALE_EUROPA]: {
  //   fetch,
  //   start: '2024-04-22'
  // },
  [CHAIN.THUNDERCORE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.ZETA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.MANTLE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.ERA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.MANTA]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.MODE]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.TAIKO]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.ZKLINK]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.APECHAIN]: {
    fetch,
    start: '2024-02-25'
  },
  [CHAIN.SONIC]: {
    fetch,
    start: '2025-02-19'
  },
  [CHAIN.HEMI]: {
    fetch,
    start: '2025-02-19'
  }
}

export default adapters
