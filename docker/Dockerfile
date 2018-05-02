FROM python:3.5
RUN mkdir -p /app
WORKDIR /app
COPY . ./
RUN pip install -r requirements.txt
RUN python setup.py install
ENTRYPOINT ["scoreboard", "evaluate", "ground_truth.txt", "example_submission.txt"]