from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, Boolean, String, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import sessionmaker
import datetime
import os
pg_user = os.environ['PG_USERNAME']
pg_pass = os.environ['PG_PASSWORD']

# Build database
engine = create_engine(
    "postgresql://{}:{}@localhost:5432/scoreboard".format(pg_user, pg_pass))
Base = declarative_base()
class User(Base):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    github_username = Column(String, nullable=False)
    name = Column(String)
    email = Column(String)
    is_admin = Column(Boolean, nullable=False)

class Challenge(Base):
    __tablename__ = 'challenges'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    end_date = Column(DateTime)
    docker_container = Column(String, nullable=False)
    is_open = Column(Boolean, nullable=False)

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

class Result(Base):
    __tablename__ = 'results'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    submission_id = Column(Integer, ForeignKey("submissions.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    results_path = Column(String, nullable=False)
    score_data = Column(JSONB)
    is_current = Column(Boolean, nullable=False)
    submission_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

Base.metadata.create_all(engine)


# Load Data
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
users = [
    {"github_username":"gh_one", "name":"HCA", "email":"", "is_admin":False},
    {"github_username":"gh_two", "name":"CZI", "email":"", "is_admin":False},
    {"github_username":"gh_three", "name":"admin", "email":"", "is_admin":True},
    {"github_username":"gh_four", "name":"external user", "email":"", "is_admin":False},
]

for user in users:
    new_user = User(**user)
    session.add(new_user)
session.commit()
challenges = [
    {"name":"doublet detection",  "docker_container": "chanzuckerberg/scoreboard", "is_open":True},
    {"name":"cell identification", "docker_container": "chanzuckerberg/scoreboard", "is_open":True},
    {"name":"batch effect correction", "docker_container": "chanzuckerberg/scoreboard", "is_open":True},
    {"name":"experimental design", "docker_container": "chanzuckerberg/scoreboard", "is_open":True},
    {"name":"cell type clustering", "docker_container": "chanzuckerberg/scoreboard", "is_open":True},
]
for challenge in challenges:
    new_challenge = Challenge(**challenge)
    session.add(new_challenge)
session.commit()
submissions = [
    {
        "name": "Algorithm #1",
        "user_id": 1,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "publication": "https://chanzuckerberg.com/",
        "institution": "",
        "is_private": False,
        "is_accepted": True,
    },
    {
        "name": "Unapproved Algorithm",
        "user_id": 2,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "publication": "https://chanzuckerberg.com/, https://chanzuckerberg.com/",
        "institution": "",
        "is_private": False,
        "is_accepted": False,
    },
    {
        "name": "Algorithm #3",
        "user_id": 2,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "institution": "",
        "is_private": False,
        "is_accepted": True,
    },
    {
        "name": "B-Algorithm #2",
        "user_id": 4,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "institution": "",
        "is_private": False,
        "is_accepted": True,
    },
    {
        "name": "Private-Algorithm #5",
        "user_id": 1,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "institution": "",
        "is_private": True,
        "is_accepted": True,
    },
]
for submission in submissions:
    new_submission = Submission(**submission)
    session.add(new_submission)
session.commit()

results = [
    {
        "submission_id": 1,
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": True,
    },
    {
        "submission_id": 2,
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": True,
    },
    {
        "submission_id": 3,
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": True,
    },
    {
        "submission_id": 4,
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": True,
    },
        {
        "submission_id": 4,
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.1],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": False,
    },
    {
        "submission_id": 5,
        "results_path": "",
        "score_data": {
            "data": [0.2, 0.2, 0.2, 0.2, 0.2, 0.1],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "is_current": True,
    },
]
for result in results:
    new_result = Result(**result)
    session.add(new_result)
session.commit()




