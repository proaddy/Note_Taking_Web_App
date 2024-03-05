export default function SearchSort({changeFilter, sortOrder}) {
  return (
    <div className="flex justify-between my-4">
        <input onChange={(e)=>changeFilter(e.target.value)} className="p-2" type="text" placeholder='Search Notes...'/>
        <select className="p-2" onChange={(e)=>{sortOrder(Boolean(e.target.value))}}>
            <option value="">Oldest</option>
            <option value="true">Latest</option>
        </select>
    </div>
  )
}
