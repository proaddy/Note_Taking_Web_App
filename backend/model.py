# Pydantic helps create the JSON schema from the models
from pydantic import BaseModel

class Note(BaseModel):
    heading: str
    content: str
    color: str = None
    folder: str = None

class Folder(BaseModel):
    name: str
    path: str = None