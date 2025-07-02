// Sources flattened with hardhat v2.25.0 https://hardhat.org

// SPDX-License-Identifier: MIT

// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v5.3.0
// Original license: SPDX_License_Identifier: MIT

pragma solidity ^0.8.20;

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

// File @openzeppelin/contracts/utils/Context.sol@v5.3.0
// Original license: SPDX_License_Identifier: MIT

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File @openzeppelin/contracts/access/Ownable.sol@v5.3.0
// Original license: SPDX_License_Identifier: MIT

abstract contract Ownable is Context {
    address private _owner;

    error OwnableUnauthorizedAccount(address account);
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        if (initialOwner == address(0)) revert OwnableInvalidOwner(address(0));
        _transferOwnership(initialOwner);
    }

    modifier onlyOwner() {
        if (owner() != _msgSender()) revert OwnableUnauthorizedAccount(_msgSender());
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) revert OwnableInvalidOwner(address(0));
        _transferOwnership(newOwner);
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File @openzeppelin/contracts/utils/ReentrancyGuard.sol@v5.3.0
// Original license: SPDX_License_Identifier: MIT

abstract contract ReentrancyGuard {
    uint256 private constant NOT_ENTERED = 1;
    uint256 private constant ENTERED = 2;

    uint256 private _status;

    error ReentrancyGuardReentrantCall();

    constructor() {
        _status = NOT_ENTERED;
    }

    modifier nonReentrant() {
        if (_status == ENTERED) revert ReentrancyGuardReentrantCall();
        _status = ENTERED;
        _;
        _status = NOT_ENTERED;
    }
}

// File contracts/interfaces/IDOLToken.sol
// Original license: SPDX_License_Identifier: MIT

interface IDOLToken {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    function mint(address to, uint256 amount) external;
    function burn(uint256 amount) external;
    function burnFrom(address from, uint256 amount) external;
    function transferOwnership(address newOwner) external;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
}

// File contracts/SWSStaking.sol
// Original license: SPDX_License_Identifier: MIT

contract SWSStaking is Ownable, ReentrancyGuard {
    IERC20 public immutable stakeToken;
    IDOLToken public immutable rewardToken;

    uint256 public rewardRate = 1e18;
    uint256 public accRewardPerToken;
    uint256 public lastRewardBlock;
    uint256 public totalStaked;

    struct StakeInfo {
        uint128 amount;
        uint128 rewardDebt;
    }

    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public pendingRewards;

    event Staked(address indexed user, uint256 amount);
    event Claimed(address indexed user, uint256 reward);
    event Withdrawn(address indexed user, uint256 amount);
    event WithdrawnAll(address indexed user, uint256 amount);

    constructor(address _stakeToken, address _rewardToken, address initialOwner)
        Ownable(initialOwner)
    {
        stakeToken = IERC20(_stakeToken);
        rewardToken = IDOLToken(_rewardToken);
        lastRewardBlock = block.number;
    }

    function updatePool() internal {
        if (block.number > lastRewardBlock && totalStaked > 0) {
            uint256 blocks = block.number - lastRewardBlock;
            uint256 reward = blocks * rewardRate;
            accRewardPerToken += (reward * 1e18) / totalStaked;
        }
        lastRewardBlock = block.number;
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be > 0");

        StakeInfo storage user = stakes[msg.sender];
        updatePool();

        if (user.amount > 0) {
            uint256 pending = (uint256(user.amount) * accRewardPerToken) / 1e18 - user.rewardDebt;
            if (pending > 0) {
                pendingRewards[msg.sender] += pending;
            }
        }

        stakeToken.transferFrom(msg.sender, address(this), amount);
        user.amount += uint128(amount);
        user.rewardDebt = uint128((uint256(user.amount) * accRewardPerToken) / 1e18);
        totalStaked += amount;

        emit Staked(msg.sender, amount);
    }

    function claim() external nonReentrant {
        updatePool();

        StakeInfo storage user = stakes[msg.sender];
        uint256 pending = (uint256(user.amount) * accRewardPerToken) / 1e18 - user.rewardDebt + pendingRewards[msg.sender];
        require(pending > 0, "No rewards");

        user.rewardDebt = uint128((uint256(user.amount) * accRewardPerToken) / 1e18);
        pendingRewards[msg.sender] = 0;
        rewardToken.mint(msg.sender, pending);

        emit Claimed(msg.sender, pending);
    }

    function withdraw(uint256 amount) external nonReentrant {
        StakeInfo storage user = stakes[msg.sender];
        require(user.amount >= amount, "Insufficient amount");
        updatePool();

        uint256 pending = (uint256(user.amount) * accRewardPerToken) / 1e18 - user.rewardDebt + pendingRewards[msg.sender];
        pendingRewards[msg.sender] = 0;

        user.amount -= uint128(amount);
        user.rewardDebt = uint128((uint256(user.amount) * accRewardPerToken) / 1e18);
        totalStaked -= amount;

        stakeToken.transfer(msg.sender, amount);
        if (pending > 0) {
            rewardToken.mint(msg.sender, pending);
        }

        emit Withdrawn(msg.sender, amount);
    }

    function withdrawAll() external nonReentrant {
        StakeInfo storage user = stakes[msg.sender];
        uint256 amount = user.amount;
        require(amount > 0, "Nothing to withdraw");

        updatePool();

        uint256 pending = (uint256(user.amount) * accRewardPerToken) / 1e18 - user.rewardDebt + pendingRewards[msg.sender];
        pendingRewards[msg.sender] = 0;

        user.amount = 0;
        user.rewardDebt = 0;
        totalStaked -= amount;

        stakeToken.transfer(msg.sender, amount);
        if (pending > 0) {
            rewardToken.mint(msg.sender, pending);
        }

        emit WithdrawnAll(msg.sender, amount);
    }

    function setRewardRate(uint256 newRate) external onlyOwner {
        updatePool();
        rewardRate = newRate;
    }

    function emergencyWithdrawTokens(address token, address to, uint256 amount) external onlyOwner {
        IERC20(token).transfer(to, amount);
    }

    function stakedBalance(address user) public view returns (uint256) {
        return stakes[user].amount;
    }

    function calculateReward(address user) public view returns (uint256) {
        StakeInfo storage info = stakes[user];

        uint256 currentAccRewardPerToken = accRewardPerToken;
        if (block.number > lastRewardBlock && totalStaked > 0) {
            uint256 blocks = block.number - lastRewardBlock;
            uint256 reward = blocks * rewardRate;
            currentAccRewardPerToken += (reward * 1e18) / totalStaked;
        }

        return ((uint256(info.amount) * currentAccRewardPerToken) / 1e18)
               - info.rewardDebt + pendingRewards[user];
    }
}

