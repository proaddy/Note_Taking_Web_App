import Note from "./Note"

export default function NoteList({sortorder, notes, onclick, filterText}) {
  let list = []
  notes.map((note)=>{
    if(note.heading.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
      return
    }
    list.push(
      <Note onclick={onclick} note={note}></Note>
    )
  })
  let revlist = list.slice().reverse()
  return (
    <div className='flex flex-col'>
      {sortorder?revlist:list}
    </div>
  )
}