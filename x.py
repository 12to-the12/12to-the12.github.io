x = '''WASM
WebGPU
WebGL
spreadsheets
APIs
Websocket
Scripting
Bash
MicroProcessors
MicroComputers
GPT-3
Stable Diffusion
IFTTT
Apple shortcuts
NFC tags'''

x = x.split('\n')

import random
for i in range(5):
    print(f'{random.choice(x)} with {random.choice(x)}')