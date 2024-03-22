import { useEffect, useState } from "react";
import SearchSort from "./components/SearchSort";
import Color from "./components/Color";
import axios from "axios";
import FolderList from "./components/FolderList";

export default function App() {
    const [noteList, setNoteList] = useState([]);
    const [folderList, setFolderList] = useState([]);

    const [showAddNote, setShowAddNote] = useState(false);
    const [showFolderAdd, setShowFolderAdd] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");

    const [showHeading, setShowHeading] = useState("");
    const [showContent, setShowContent] = useState("");

    const [noteColor, setNoteColor] = useState("");

    const [folder, setFolder] = useState('');
    const [subFolder, setSubFolder] = useState('/');
    const [noteLocation, setNoteLocation] = useState('');

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/note/")
            .then((res) => setNoteList(res.data))
            .catch(() => "error fetching data from database");
        axios
            .get("http://127.0.0.1:8000/folder/")
            .then((res) => setFolderList(res.data))
            .catch(() => "error fetching folderlist from database")
    }, []);

    const addNote = async () => {
        if (heading !== "") {
            try {
                axios.post("http://127.0.0.1:8000/note/", {
                    heading: heading.trim(),
                    content: content,
                    color: noteColor,
                    folder: noteLocation
                });
                setNoteList([
                    ...noteList,
                    { heading: heading, content: content, color: noteColor, folder: noteLocation },
                ]);
            } catch (error) {
                console.log("Error at note add", error);
            }
        } else {
            alert("Title cannot be empty");
        }
        setShowAddNote(!showAddNote)
        setHeading("");
        setContent("");
        setNoteColor("");
    };

    const deleteNote = async (title) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/note/delete/${title}`);
            setNoteList(noteList.filter((note) => note.heading != title));
        } catch (error) {
            console.log("Error while deleting", error);
        }
    };

    const updateNote = async (heading) => {
        try {
            await axios.put(`http://127.0.0.1:8000/note/edit/${heading}?content=${showContent}`)
            alert("Content Updated")
        } catch (error) {
            console.log("Error while updating", error)
        }   
        // console.log(heading, typeof(heading))
    }

    const addFolder = (foldername, path) => {
        if (foldername !== "") {
            try {
                axios.post("http://127.0.0.1:8000/folder/", {
                    name: foldername.trim(),
                    path: path
                });
                setFolderList([
                    ...folderList,
                    { name: foldername.trim(), path: path }
                ]);
            } catch (error) {
                console.log("Error adding folder", error);
            }
        } else {
            alert("Foldername cannot be empty");
            return
        }
        setFolder('');
        setShowFolderAdd(!showFolderAdd);
    }

    const deleteFolder = async (name) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/folder/delete/${name}`);
            setFolderList(folderList.filter((folder) => folder.name != name));
        } catch (error) {
            console.log("Error while deleting", error);
        }
    };

    const setlocation = async (path, name) => {
        path === '/' ? setNoteLocation(`${path}${name}`):setNoteLocation(`${path}/${name}`)
        setShowAddNote(!showAddNote)
    }

    const setsfolder = async (folder) => {
        // console.log(folder)
        setSubFolder(`${folder.path}/${folder.name}`)
        setShowFolderAdd(!showFolderAdd);
    }

    return (
        <div className="flex h-[100vh]">
            {/* Left hand side */}
            <div className="flex flex-col p-3 border border-black w-96">
                <h1 className="text-xl">Note-Taker-100</h1>
                <SearchSort
                    changeFilter={setFilterText}
                ></SearchSort>
                {showFolderAdd && 
                    <div className="m-1">
                        <input className="p-4" type="text" onChange={(e)=>setFolder(e.target.value)} placeholder="Enter folder name..." />
                        <button onClick={()=>addFolder(folder, subFolder)} className="bg-slate-500 rounded-md text-white p-3">Confirm</button>
                    </div>
                }
                
                <div className="flex items-start">
                    <div className="flex flex-col w-full">
                        <FolderList setSFolder={setsfolder} setLocation={setlocation} deletenote={deleteNote} deleteFolder={deleteFolder} noteList={noteList} folderList={folderList} showHeading={setShowHeading} showContent={setShowContent}/>
                    </div>
                </div>
                <button onClick={()=>setShowFolderAdd(!showFolderAdd)} className="bg-slate-500 rounded-md text-white p-3 w-44 fixed bottom-4 left-16">Add folder</button>
            </div>

            {/* Right hand side */}
            <div className="content-center">
                {showAddNote && (
                    <div className="flex items-center justify-between">
                        <div className="w-80">
                            <input
                                onChange={(e) => setHeading(e.target.value)}
                                className="p-2 my-1 mx-2 w-60"
                                type="text"
                                placeholder="Enter Title..."
                            />
                            <div className="flex justify-evenly items-center m-2">
                                <span>Select Color:</span>
                                <Color setColor={setNoteColor} color={"red"}></Color>
                                <Color setColor={setNoteColor} color={"blue"}></Color>  
                                <Color setColor={setNoteColor} color={"yellow"}></Color>
                                <Color setColor={setNoteColor} color={"green"}></Color>
                                <Color setColor={setNoteColor} color={"purple"}></Color>
                            </div>
                        </div>
                        <button
                            onClick={addNote}
                            className="bg-slate-500 rounded-md text-white p-3"
                        >
                            Add Note
                        </button>
                    </div>
                )}
                <div className="flex flex-col m-5">
                    <input className="p-1 h-14 text-3xl" type="text" value={`${showHeading}`} placeholder="Note title..."/>
                    <div className="flex items-center">
                        <hr className="w-80 h-1 bg-gray-400 mr-4"/> 
                        <span className="text-xs text-gray-400">Copyright &copy; Adarsh 2024</span>
                    </div>
                    <textarea className="p-3 " cols="70" rows="20" value={`${showContent}`} onChange={(e)=>setShowContent(e.target.value)}></textarea>
                </div>

                <button onClick={()=>updateNote(showHeading)}
                    className="bg-slate-500 rounded-md text-white p-3 w-40 mx-3 fixed bottom-4"
                >Update</button>
            </div>
            {/* This is just to render the colors through tailwind */}
            <div className="hidden">
                <div className="w-8 h-8 bg-red-200 border-2 border-red-600 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-200 border-2 border-blue-600 rounded-full"></div>
                <div className="w-8 h-8 bg-green-200 border-2 border-green-600 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-200 border-2 border-yellow-600 rounded-full"></div>
                <div className="w-8 h-8 bg-purple-200 border-2 border-purple-600 rounded-full"></div>
            </div>
        </div>
    );
}
