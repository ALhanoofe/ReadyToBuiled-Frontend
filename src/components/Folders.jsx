import { useEffect, useState } from "react";
import { CheckSession } from '../services/Auth';
import { GetFoldersForUser } from "../services/ProjectServices";
import { Link } from "react-router-dom";
import '../style/folder.css'

const Folders = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const session = await CheckSession();


        const userId = session.id;

        const myFolders = await GetFoldersForUser(userId);


        setFolders(myFolders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFolders();
  }, []);

  return (
    <div className="folders">

      <h1>Folders Page</h1>

      <Link to={`/folderForm`} className="add-folder-btn">
        + Add New Folder
      </Link>

      <div className="grid col-4">
        {folders.map((folder) => (
          <div className="card" key={folder._id}>
            <Link to={`/folders/${folder._id}`}>
              <h2>{folder.pname}</h2>
              <h3>{folder.language}</h3>
              <h3>{folder.description}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Folders;
