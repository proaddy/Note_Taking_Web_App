import { useState } from "react";

export default function Folder({setLocation, deleteNote, deleteFolder, noteList, folderName, showHeading, showContent}) {
    const [showFolder, setShowFolder] = useState(false);

    let rotate = "";
    let color = "";

    if (showFolder) {
        rotate = "-rotate-90";
    } else {
        rotate = "rotate-180";
    }
    return (
        <>
            <div className="flex justify-between">
                <div onClick={() => setShowFolder(!showFolder)} className="flex items-center cursor-pointer border-b-2">
                    <img src="/less-than.png" className={`h-5 ${rotate}`} />
                    <img src="/folder.png" className="h-8" />
                    <span className="pl-2">{folderName}</span>
                </div>
                <div className="flex self-center">
                    <img src="/add-post.png" onClick={()=>setLocation(folderName)} className="h-5 pr-3 opacity-50" />
                    <img
                        src="/folder-delete.png"
                        onClick={() => deleteFolder(folderName)}
                        className="h-5"
                    />
                </div>
            </div>
            <div>
                {showFolder && (
                    <div>
                        {noteList
                            .filter((note) => note.folder.toLowerCase() === folderName.toLowerCase())
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
                )}
            </div>
        </>
    );
}
