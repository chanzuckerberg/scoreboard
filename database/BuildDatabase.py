from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, Boolean, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import func
import datetime
import os
import json

database = {
    'pg_user': os.environ['PG_USERNAME'],
    'pg_pass': os.environ['PG_PASSWORD'],
    'pg_host': os.environ.get('PG_HOST', 'localhost'),
    'pg_port':  os.environ.get('PG_PORT', 5432),
    'pg_database': os.environ.get('PG_DATABASE', 'scoreboard')
}


# Build database
engine = create_engine(
    "postgresql://{pg_user}:{pg_pass}@{pg_host}:{pg_port}/{pg_database}".format(**database))

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    github_username = Column(String, nullable=False)
    name = Column(String)
    email = Column(String)
    is_admin = Column(Boolean, nullable=False)
    create_date = Column(DateTime, nullable=False, server_default=func.now())

class Challenge(Base):
    __tablename__ = 'challenges'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    docker_container = Column(String, nullable=False)
    image = Column(String)
    data_path = Column(String)
    data_size = Column(String)
    color = Column(String)
    about = Column(String)
    example_file = Column(String)
    submission_header = Column(JSONB)
    submission_separator = Column(String, default=",")
    scores = Column(JSONB)
    start_date = Column(DateTime, nullable=False, server_default=func.now())
    end_date = Column(DateTime)
    is_open = Column(Boolean, nullable=False, default=True)
    create_date = Column(DateTime, nullable=False, server_default=func.now())

class Dataset(Base):
    __tablename__ = 'datasets'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    tree = Column(JSONB)
    challenge_id = Column(Integer, ForeignKey("challenges.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    create_date = Column(DateTime, nullable=False, server_default=func.now())

class Submission(Base):
    __tablename__ = 'submissions'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("challenges.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    repository = Column(String, nullable=False)
    is_private = Column(Boolean, nullable=False)
    institution = Column(String)
    publication = Column(String)
    is_accepted = Column(Boolean, nullable=False)
    create_date = Column(DateTime, nullable=False, server_default=func.now())

class Result(Base):
    __tablename__ = 'results'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    submission_id = Column(Integer, ForeignKey("submissions.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    results_path = Column(String, nullable=False)
    score_data = Column(JSONB)
    is_current = Column(Boolean, nullable=False)
    submission_date = Column(DateTime, nullable=False, server_default=func.now())
    create_date = Column(DateTime, nullable=False, server_default=func.now())

Base.metadata.create_all(engine)


# Load Data
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

with open("initialize.json") as fh:
    initialize_data = json.load(fh)

for challenge in initialize_data["challenges"]:
    datasets = challenge.pop('datasets', [])
    new_challenge = Challenge(**challenge)
    session.add(new_challenge)
    session.flush()
    session.refresh(new_challenge)
    challenge_id = new_challenge.id
    for dataset in datasets:
        dataset["challenge_id"] = challenge_id
        new_dataset = Dataset(**dataset)
        session.add(new_dataset)

for admin in initialize_data["admins"]:
    new_user = User(github_username=admin, is_admin=True)
    session.add(new_user)
session.commit()




