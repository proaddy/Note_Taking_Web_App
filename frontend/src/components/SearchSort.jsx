export default function SearchSort({changeFilter}) {
  return (
    <div className="flex my-4 justify-between">
        <input onChange={(e)=>changeFilter(e.target.value)} className="p-2" type="text" placeholder='Search Notes...'/>
    </div>
  )
}
