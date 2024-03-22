import { useState } from "react";

export default function Folder({setSFolder, setLocation, deleteNote, deleteFolder, noteList, folderList, folder, showHeading, showContent}) {
    const [showFolder, setShowFolder] = useState(false);

    let rotate = "";
    let color = "";

    if (showFolder) {
        rotate = "-rotate-90";
    } else {
        rotate = "rotate-180";
    }
    let folderFilter = folder.path === '/' ? `${folder.path}${folder.name}`.toLowerCase():`${folder.path}/${folder.name}`.toLowerCase();
    return (
        <>
            <div className="flex justify-between">
                <div onClick={() => setShowFolder(!showFolder)} className="flex items-center cursor-pointer border-b-2">
                    <img src="/less-than.png" className={`h-5 ${rotate}`} />
                    <img src="/folder.png" className="h-8" />
                    <span className="pl-2">{folder.name}</span>
                </div>
                <div className="flex self-center">
                    <img src="/add-post.png" onClick={()=>setLocation(folder.path, folder.name)} className="h-5 pr-2 opacity-50" />
                    <img src="/folder-add.png" onClick={()=>setSFolder(folder)} className="h-6 pr-2 opacity-80"/>
                    <img
                        src="/folder-delete.png"
                        onClick={() => deleteFolder(folder.name)}
                        className="h-5"
                    />
                </div>
            </div>
            <div>
                {showFolder && (
                    <>
                    <div className="pl-7">
                        {folderList.filter((fol)=>fol.path.toLowerCase() === folderFilter).map((folder)=>{
                            return (
                                <Folder folder={folder} setSFolder={setSFolder} setLocation={setLocation} deleteNote={deleteNote} deleteFolder={deleteFolder} key={folder.name} showHeading={showHeading} showContent={showContent} noteList={noteList} folderList={folderList}/>
                                )
                            })
                        }
                    </div>
                    <div>
                        {noteList
                            .filter((note) => note.folder.toLowerCase() === folderFilter)
                            .map((note) => {
                                if (!note.color) {
                                    color = "default";
                                } else {
                                    color = note.color;
                                }
                                return (
                                    <span
                                        className="pl-9 flex justify-between my-1 cursor-default"
                                        onClick={() => {
                                            showHeading(note.heading);
                                            showContent(note.content);
                                        }}>
                                        <img src={`/assets/pack2/${color}.png`} className="h-6 pr-2"/>
                                        {note.heading}
                                        <img src="/delete-post.png" className="h-5 self-center ml-auto opacity-70" onClick={()=>deleteNote(note.heading)}/>
                                    </span>
                                );
                            })}
                    </div>
                    </>
                )}
            </div>
        </>
    );
}
