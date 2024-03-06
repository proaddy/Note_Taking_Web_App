import Folder from "./Folder";

export default function FolderList({noteList, showHeading, showContent}) {
    return (
        <div>
            <Folder noteList={noteList} folderName={"Folder 1"}/>
            <Folder noteList={noteList} folderName={"Folder 2"}/>
        </div>
    );
}
