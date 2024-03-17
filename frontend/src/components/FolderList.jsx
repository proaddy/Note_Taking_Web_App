import Folder from "./Folder";

export default function FolderList({setLocation, deletenote, deleteFolder, noteList, folderList, showHeading, showContent}) {
    return (
        <div>
            {
                folderList.filter((folder)=>folder.path === '/').map((folder)=>{
                    return (
                        <Folder setLocation={setLocation} deleteNote={deletenote} deleteFolder={deleteFolder} key={folder.name} showHeading={showHeading} showContent={showContent} noteList={noteList} folderName={folder.name}/>
                        )
                    })
            }
        </div>
    );
}
