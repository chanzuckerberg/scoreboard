#!/usr/bin/env python

from setuptools import setup, find_packages

version = '1.0.0'

required = open('requirements.txt').read().split('\n')

setup(
    name='scoreboard',
    version=version,
    description='',
    author='',
    author_email='',
    url='',
    packages=find_packages(),
    install_requires=required,
    entry_points={"console_scripts": ['scoreboard = scoreboard.cli:cli']},
    license='MIT'
)
