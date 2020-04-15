# Scoreboard CLI

This shows an example of how to write a python program for scoring submissions agains a ground truth file as well as how to create a the docker container for the scoreboard app for scoring that challenge

## To create, test, and publish your docker container

1. Edit main.py:validate_file and main.py:score to validate submission and write your scoring code.
2. Make sure your ground truth file is within this folder and replace "ground_truth.txt" in the last line of Dockerfile with the ground truth filename.
3. Build your docker container

```
docker build -t <org>/<name>:latest .
```

4. Test your docker container

```
docker run --rm -v <path to submission file>:/app/resultsfile.txt <name>:<tag>
```

5. Push your docker container

```
docker push <org>/<name>:latest
```

6. Ensure you set the docker_container field for your challenge to be <org>/<name> for you challenge

## You can use programs written with this format in various other ways

### Use as a python module

```python
from scoreboard import score
results = score(a, b)
```

### Install as command-line tool

#### install

```
python setup.py install
```

#### run

```
scoreboard evaluate groundtruth_example.txt results.txt
```
