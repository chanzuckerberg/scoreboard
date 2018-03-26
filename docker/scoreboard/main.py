import csv
import re


def score(ground_truth, results):
    """
    Scores results file against groundtruth. Returns json scores.
    """
    # Compare the ground truth file with the results and return the score as a json list.
    return {'score': [0.5, 0.9, 0.1, 0.1], 'error': ''}


def validate_file(filename):
    """
    Reads uploaded file and validates it.
    """
    valid = True
    error = ""
    target_header = ["item", "value", "prob"]
    ideal_length = 10
    header_length = len(target_header)

    with open(filename) as fh:
        reader = csv.reader(fh)
        header = next(reader)
        if header != target_header:
            valid = False
            error = "Bad header"
        actual_length = 0
        for line in reader:
            actual_length += 1
            if len(line) != header_length:
                valid = False
                error = "Wrong number of columns, should be {0}".format(header_length)
    if actual_length != ideal_length:
        valid = False
        error = "Error expected {} lines, found {} lines".format(ideal_length, actual_length)
 
    return valid, {'error': error}

