from model import Note

# mongoDB Driver
import motor.motor_asyncio

# connect to mongoDB Database
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')

database = client.Notes
noteCollection = database.note
folderCollection = database.folder

# Create
async def create_note(note:Note):
    note = note
    result = await noteCollection.insert_one(note)
    return {"Result":result}

# Read
async def read_one_note(header):
    result = await noteCollection.find_one({"heading":header})
    return result

async def read_all_notes():
    Notes = []
    result = noteCollection.find({})
    async for document in result:
        Notes.append(Note(**document))
    return Notes

# Update
async def update_note(header, content):
    await noteCollection.update_one({"heading":header}, {"$set":{"content":content}})
    result = await noteCollection.find_one({"heading":header})
    return result

# Delete
async def delete_note(header):
    result = await noteCollection.delete_one({"heading":header})
    return result
'''
we get the actual value of delete_one function which is
no of documents deleted
result.deleted_count
'''