import json
from scoreboard import score

results = score("groundtruth.csv", "group6_doubletTask_v1.output.txt")
print(json.dumps(results))
