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
    description = Column(String)
    start_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    image_path = Column(String)
    is_open = Column(Boolean, nullable=False)

class Dataset(Base):
    __tablename__ = 'datasets'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(String)
    dataset_metadata = Column(JSONB)
    challenge_id = Column(Integer, ForeignKey("challenges.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)

class Submission(Base):
    __tablename__ = 'submissions'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("challenges.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    repository = Column(String, nullable=False)
    results_path = Column(String, nullable=False)
    score_data = Column(JSONB)
    is_private = Column(Boolean, nullable=False)
    institution = Column(String)
    publication = Column(String)
    submission_date = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
    is_accepted = Column(Boolean, nullable=False)

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
    {"name":"doublet detection", "description":"this challenge is doublet detection", "image_path":"http://via.placeholder.com/100/00ccff", "is_open":True},
    {"name":"cell identification", "description":"this challenge is cell identification", "image_path":"http://via.placeholder.com/100/00ccff", "is_open":True},
    {"name":"batch effect correction", "description":"this challenge is batch effect correction", "image_path":"http://via.placeholder.com/100/00ccff", "is_open":True},
    {"name":"experimental design", "description":"this challenge is experimental design", "image_path":"http://via.placeholder.com/100/00ccff", "is_open":True},
    {"name":"cell type clustering", "description":"this challenge is cell type clustering", "image_path":"http://via.placeholder.com/100/00ccff", "is_open":True},
]
for challenge in challenges:
    new_challenge = Challenge(**challenge)
    session.add(new_challenge)
session.commit()
datasets = [
    {"name":"dataset1", "description":"Bams and fastqs from Ye2", "dataset_metadata":[		 { "id": "doublet-datasets/dataset1", "parent": "#", "text": "dataset1", },
			 { "id": "doublet-datasets/dataset1/Ye2_L001_001.bam", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_001.bam (8G)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_001_test.bam", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_001_test.bam (4G)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_001_test_labels_predict_me.txt", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_001_test_labels_predict_me.txt (183K)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_001_train.bam", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_001_train.bam (4G)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_001_train_labels.txt", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_001_train_labels.txt (271K)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_I1_001.fastq.gz", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_I1_001.fastq.gz (637M)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_R1_001.fastq.gz", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_R1_001.fastq.gz (2G)"},
			 { "id": "doublet-datasets/dataset1/Ye2_L001_R2_001.fastq.gz", "parent": "doublet-datasets/dataset1", "text": "Ye2_L001_R2_001.fastq.gz (8G)"},
			 { "id": "doublet-datasets/dataset1/Ye2_barcode_id.csv", "parent": "doublet-datasets/dataset1", "text": "Ye2_barcode_id.csv (8M)"},
			 { "id": "doublet-datasets/dataset1/Ye2_gene_id.csv", "parent": "doublet-datasets/dataset1", "text": "Ye2_gene_id.csv (409K)"},
			 { "id": "doublet-datasets/dataset1/Ye2_sparse_molecule_counts.mtx", "parent": "doublet-datasets/dataset1", "text": "Ye2_sparse_molecule_counts.mtx (278M)"},],
     "challenge_id": 1},
    {"name":"dataset2", "description":"Bams and fastqs from Ye032917", "dataset_metadata":[{ "id": "doublet-datasets/dataset2", "parent": "#", "text": "dataset2", },
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_001.bam", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_001.bam (16G)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_001_test.bam", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_001_test.bam (8G)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_001_train.bam", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_001_train.bam (8G)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_001_train_labels.txt", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_001_train_labels.txt (119K)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_I1_001.fastq.gz", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_I1_001.fastq.gz (1G)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_R1_001.fastq.gz", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_R1_001.fastq.gz (5G)"},
			 { "id": "doublet-datasets/dataset2/Ye032917_S4_L003_R2_001.fastq.gz", "parent": "doublet-datasets/dataset2", "text": "Ye032917_S4_L003_R2_001.fastq.gz (17G)"},
			 { "id": "doublet-datasets/dataset2/Ye3_barcode_id.csv", "parent": "doublet-datasets/dataset2", "text": "Ye3_barcode_id.csv (5M)"},
			 { "id": "doublet-datasets/dataset2/Ye3_gene_id.csv", "parent": "doublet-datasets/dataset2", "text": "Ye3_gene_id.csv (405K)"},
			 { "id": "doublet-datasets/dataset2/Ye3_sparse_molecule_counts.mtx", "parent": "doublet-datasets/dataset2", "text": "Ye3_sparse_molecule_counts.mtx (156M)"}],
     "challenge_id": 1}

]

for dataset in datasets:
    new_dataset = Dataset(**dataset)
    session.add(new_dataset)
session.commit()
submissions = [
    {
        "name": "Algorithm #1",
        "user_id": 1,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "results_path": "",
        "score_data": {
            "data": [0.9, 0.8, 0.7, 0.6, 0.5, 0.4],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
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
        "results_path": "",
        "score_data": {
            "data": [0.6, 0.5, 0.3, 0.4, 0.89, 0.3],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
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
        "results_path": "",
        "score_data": {
            "data": [0.4, 0.11, 0.1, 0.99, 0.46, 0.32],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "institution": "",
        "is_private": False,
        "is_accepted": True,
    },
    {
        "name": "B-Algorithm #2",
        "user_id": 4,
        "challenge_id": 1,
        "repository": "https://github.com/chanzuckerberg/hca-bakeoff-site",
        "results_path": "",
        "score_data": {
            "data": [0.4, 0.11, 0.1, 0.99, 0.46, 0.32],
            "additionalData": [[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]],
        },
        "institution": "",
        "is_private": False,
        "is_accepted": True,
    },
]
for submission in submissions:
    new_submission = Submission(**submission)
    session.add(new_submission)
session.commit()




