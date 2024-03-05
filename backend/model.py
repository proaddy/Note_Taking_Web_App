# Pydantic helps create the JSON schema from the models
from pydantic import BaseModel
from datetime import datetime

class Note(BaseModel):
    heading: str
    content: str
    color: str = None