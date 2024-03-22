import Folder from "./Folder";

export default function FolderList({setSFolder, setLocation, deletenote, deleteFolder, noteList, folderList, showHeading, showContent}) {
    return (
        <div>
            {
                folderList.filter((folder)=>folder.path === '/').map((folder)=>{
                    return (
                        <Folder folder={folder} setSFolder={setSFolder} setLocation={setLocation} deleteNote={deletenote} deleteFolder={deleteFolder} key={folder.name} showHeading={showHeading} showContent={showContent} noteList={noteList} folderList={folderList}/>
                        )
                    })
            }
        </div>
    );
}
