export default function Note({onclick, note}) {
  return (
    <div className={`px-1 py-3 my-2 bg-${note.color}-200 border-2 border-${note.color}-600`} key={note.heading}>
    <span className='text-xl font-bold flex justify-between'>{note.heading} {note.heading && <button onClick={()=>onclick(note.heading)} className='font-sans text-xs text-red-500'>Delete</button>}</span>
    <p className='my-2'>{note.content}</p>
  </div>
  )
}

// colors = red, blue, yellow, green, purple
