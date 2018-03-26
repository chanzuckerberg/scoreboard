import click

settings = dict(help_option_names=['-h', '--help'])
from .commands import evaluate

import warnings
warnings.filterwarnings("ignore")


@click.group(options_metavar='', subcommand_metavar='<command>', context_settings=settings)
def cli():
    """
    Scores results file against groundtruth

    Check out the list of commands to see what you can do.
    """

cli.add_command(evaluate)
