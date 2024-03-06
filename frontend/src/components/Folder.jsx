import { useState } from "react";
import FolderItem from "./FolderItem";

export default function Folder({noteList, folderName }) {
    const [showFolder, setShowFolder] = useState(false);

    let rotate = "";
    if (showFolder) {
        rotate = "-rotate-90";
    } else {
        rotate = "rotate-180";
    }
    return (
        <>
            <div
                className="flex items-center cursor-pointer border-b-2"
                onClick={() => setShowFolder(!showFolder)}
            >
                <img src="/less-than.png" className={`h-5 ${rotate}`} />
                <img src="/folder.png" className="h-8" />
                <span className="pl-2">{folderName}</span>
            </div>
            <div>
                {showFolder && (<FolderItem folderName={folderName} noteList={noteList}/>)}
            </div>
        </>
    );
}
