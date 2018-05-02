import click
import json
from .. import score, validate_file


@click.argument('files', nargs=2, metavar='<files: ground truth, estimate>', required=True)
@click.command('evaluate', short_help='gets confusion matrix in JSON format by comparing results with ground truth', options_metavar='<options>')
def evaluate(files):
    valid, error = validate_file(files[1])
    
    if valid:
        results = score(files[0], files[1])
        print(json.dumps(results))
    else:
        print(json.dumps(error))
