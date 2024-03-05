export default function Color({color, setColor}) {
    const tailWindClasses = `w-10 h-10 bg-${color}-200 border-2 border-${color}-600 rounded-full`;
  return (
    <div className={tailWindClasses} onClick={()=>setColor(color)}></div>
  )
}