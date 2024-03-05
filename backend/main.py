from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import Note
from database import (
    create_note,
    read_one_note,
    read_all_notes,
    update_note,
    delete_note
)

app = FastAPI()

origins = ['http://localhost:5173']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def root():
    return {"Hello":"World!!!"}

@app.get('/note/')
async def get_note():
    response = await read_all_notes()
    return response

@app.get('/note/{heading}', response_model=Note)
async def get_note_by_heading(heading):
    response = await read_one_note(heading)
    if response:
        return response
    raise HTTPException(404, "Notes not found")

@app.post('/note/')
async def make_note(note:Note):
    response = await create_note(note.model_dump())
    if response:
        return {"response":response}
    raise HTTPException(400, "Bad Request!!!")

@app.put('/note/edit/{heading}', response_model=Note)
async def edit_note(heading: str, content:str):
    response = await update_note(heading, content)
    if response:
        return response
    raise HTTPException(404, "There is not item to edit")

@app.delete('/note/delete/{heading}')
async def del_notes(heading):
    response = await delete_note(heading)
    if response:
        return "Successfully Deleted"
    raise HTTPException(404, "Note not found to delete")