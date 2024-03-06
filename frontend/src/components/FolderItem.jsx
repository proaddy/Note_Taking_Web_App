import React, { useState } from "react";

export default function FolderItem({ noteList, folderName }) {
    let color = "";
    return (
        <div>
            {noteList
                .filter(
                    (note) =>
                        note.folder.toLowerCase() !== folderName.toLowerCase()
                )
                .map((note) => {
                    if (!note.color) {
                        color = "default";
                    } else {
                        color = note.color;
                    }
                    return (
                        <span
                            className="pl-9 flex my-1 cursor-default"
                            onClick={(e) => {
                                showHeading(e.target.innerText);
                            }}
                        >
                            <img
                                src={`/assets(1)/pack2/${color}.png`}
                                className="h-6 pr-2"
                            />
                            {note.heading}
                        </span>
                    );
                })}
        </div>
    );
}
