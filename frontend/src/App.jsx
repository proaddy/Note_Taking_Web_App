import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import SearchSort from "./components/SearchSort";
import Color from "./components/Color";
import axios from "axios";
import Folder from "./components/Folder";
import FolderList from "./components/FolderList";

export default function App() {
    const [noteList, setNoteList] = useState([]);

    const [show, setShow] = useState(false);
    const [sortOrder, setSortOrder] = useState(false);

    const [filterText, setFilterText] = useState("");
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");

    const [showHeading, setShowHeading] = useState("");
    const [showContent, setShowContent] = useState("");

    const [noteColor, setNoteColor] = useState("");

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/note/")
            .then((res) => setNoteList(res.data))
            .catch(() => "error fetching data from database");
    }, []);

    const addNote = async () => {
        if (heading !== "") {
            try {
                axios.post("http://127.0.0.1:8000/note/", {
                    heading: heading.trim(),
                    content: content,
                    color: noteColor,
                });
                setNoteList([
                    ...noteList,
                    { heading: heading, content: content, color: noteColor },
                ]);
                setShow(!show);
            } catch (error) {
                console.log("Error at note add", error);
            }
        } else {
            alert("Title cannot be empty");
        }
        setHeading("");
        setContent("");
    };

    const deleteNote = async (title) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/note/delete/${title}`);
            setNoteList(noteList.filter((note) => note.heading != title));
        } catch (error) {
            console.log("Error while deleting", error);
        }
    };

    return (
        <div className="flex flex-col p-3">
            <div className="flex justify-between">
                <h1 className="text-xl">Note-Taker-100</h1>
                <img
                    onClick={() => setShow(!show)}
                    className="h-7"
                    src="/edit.png"
                    alt="add note"
                />
            </div>
            <SearchSort
                changeFilter={setFilterText}
                sortOrder={setSortOrder}
            ></SearchSort>
            {show && (
                <>
                    <input
                        onChange={(e) => setHeading(e.target.value)}
                        className="p-2 my-1 mx-2"
                        type="text"
                        placeholder="Enter Title"
                    />
                    <input
                        onChange={(e) => setContent(e.target.value)}
                        className="p-2 my-1 mx-2"
                        type="text"
                        placeholder="Enter Content"
                    />
                    <div className="flex justify-evenly items-center m-2 p-2">
                        <span>Select Color:</span>
                        <Color setColor={setNoteColor} color={"red"}></Color>
                        <Color setColor={setNoteColor} color={"blue"}></Color>
                        <Color setColor={setNoteColor} color={"yellow"}></Color>
                        <Color setColor={setNoteColor} color={"green"}></Color>
                        <Color setColor={setNoteColor} color={"purple"}></Color>
                    </div>
                    <button
                        onClick={addNote}
                        className="bg-slate-500 rounded-md w-auto text-white font-bold px-1 py-3"
                    >
                        Submit
                    </button>
                </>
            )}
            <div>
                <NoteList sortorder={sortOrder} notes={noteList} onclick={deleteNote} filterText={filterText}/>
            </div>
        </div>
    );
}
