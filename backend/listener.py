import json
import time
import os
from datetime import datetime
from dotenv import load_dotenv
from web3 import Web3
from eth_utils import keccak
from telegram import Bot
import asyncio
import requests  

# Load environment variables
load_dotenv()

DISCORD_WEBHOOK = os.getenv("DISCORD_WEBHOOK")
WEB3_PROVIDER = os.getenv("ZKSYNC_ERA_MAINNET_RPC")
STAKING_ADDRESS = os.getenv("SWSSTAKING_ADDRESS")
TG_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TG_CHAT_IDS = [
    os.getenv("TELEGRAM_INTERNAL_CHAT_ID"),
    os.getenv("TELEGRAM_PUBLIC_CHAT_ID"),
]

# Connect to zkSync Era
w3 = Web3(Web3.HTTPProvider(WEB3_PROVIDER))
assert w3.is_connected(), "❌ RPC unavailable"

# Define paths
BASE_DIR = os.path.dirname(__file__)
abi_path = os.path.join(BASE_DIR, "abi", "SWSStaking.abi.json")
log_file = os.path.join(BASE_DIR, "logs", "mint_log.json")
os.makedirs(os.path.join(BASE_DIR, "logs"), exist_ok=True)

# Load ABI
with open(abi_path, "r") as f:
    abi = json.load(f)

# Prepare contract
contract = w3.eth.contract(address=STAKING_ADDRESS, abi=abi)
event_names = ["Staked", "Claimed", "Withdrawn", "WithdrawnAll"]

# Format amounts
def format_amount(value):
    return float(value) / 1e18 if isinstance(value, int) else value

# Save to mint_log.json
def save_log(entry):
    try:
        with open(log_file, "r") as f:
            logs = json.load(f)
    except FileNotFoundError:
        logs = []

    logs.append(entry)
    with open(log_file, "w") as f:
        json.dump(logs, f, indent=2)

# Telegram bot
bot = Bot(token=TG_TOKEN)

# Discord alert
def send_discord_alert(text):
    if DISCORD_WEBHOOK:
        try:
            requests.post(DISCORD_WEBHOOK, json={"content": text})
        except Exception as e:
            print("⚠️ Discord Error:", e)

# Start listening
start_block = w3.eth.block_number
print("✅ Bot started. Listening for events...")

async def main():
    global start_block
    while True:
        end_block = w3.eth.block_number
        for event_name in event_names:
            try:
                # Compute event topic from ABI
                event_abi = next(e for e in abi if e.get("name") == event_name and e["type"] == "event")
                signature = f"{event_name}({','.join([i['type'] for i in event_abi['inputs']])})"
                topic = keccak(text=signature).hex()

                # Query logs
                logs = w3.eth.get_logs({
                    "fromBlock": start_block,
                    "toBlock": end_block,
                    "address": STAKING_ADDRESS,
                    "topics": [topic]
                })

                # Decode and handle logs
                for raw_log in logs:
                    decoded = contract.events[event_name]().process_log(raw_log)
                    entry = {
                        "event": event_name,
                        "block": decoded.blockNumber,
                        "txHash": decoded.transactionHash.hex(),
                        "args": {
                            k: format_amount(v) for k, v in dict(decoded.args).items()
                        },
                        "timestamp": datetime.utcnow().isoformat() + "Z"
                    }

                    save_log(entry)

                    # Compose message
                    msg = f"""📢 {event_name}:
👤 User: {entry['args'].get('user', 'N/A')}
💰 Reward: {entry['args'].get('reward', 'N/A')}
📦 Amount: {entry['args'].get('amount', 'N/A')}
🔢 Block: {entry['block']}
🔗 Tx: {entry['txHash']}
🕒 Time: {entry['timestamp']}"""

                    print(msg)
                    try:
                        for chat_id in TG_CHAT_IDS:
                            if chat_id:
                                await bot.send_message(chat_id=chat_id, text=msg)
                                save_log(entry)
                    except Exception as tg_err:
                        print("⚠️ Telegram Error:", tg_err)

                    send_discord_alert(msg)  # ⬅ Discord notification

            except Exception as log_err:
                print(f"⚠️ Log Read Error: '{event_name}'", log_err)

        start_block = end_block + 1
        time.sleep(5)

# Launch event loop
asyncio.run(main())

