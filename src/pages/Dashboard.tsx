import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoForm from "../components/VideoForm";

import {
  getAllVideos,
  deleteVideo,
  togglePublish,
  updateVideo,
} from "../services/video";

interface Video {
  _id: string;
  title: string;
  description: string;
  videoFile: string;
  thumbnail: string;
  views: number;
  isPublished: boolean;
}

function Dashboard() {
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingVideo, setEditingVideo] =
    useState<Video | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] =
    useState("");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getAllVideos();

      setVideos(response.data.data.videos);
    } catch (error) {
      console.log(error);
      alert("Couldn't fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this video?"
    );

    if (!confirmDelete) return;

    try {
      await deleteVideo(id);

      fetchVideos();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await togglePublish(id);

      fetchVideos();
    } catch (error) {
      console.log(error);
    }
  };

  const openEdit = (video: Video) => {
    setEditingVideo(video);

    setEditTitle(video.title);

    setEditDescription(video.description);
  };

  const saveEdit = async () => {
    if (!editingVideo) return;

    try {
      const formData = new FormData();

      formData.append("title", editTitle);

      formData.append(
        "description",
        editDescription
      );

      await updateVideo(
        editingVideo._id,
        formData
      );

      setEditingVideo(null);

      fetchVideos();
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading Videos...
      </div>
    );
  }
    return (
    <div className="dashboard">

      <nav className="navbar">

        <div>
          <h2>🎬 VideoHub</h2>

          <p>
            Manage and organize your videos
          </p>
        </div>

        <button onClick={logout}>
          Logout
        </button>

      </nav>


      <section className="upload-section">

        <VideoForm
          refreshVideos={fetchVideos}
        />

      </section>


      <section className="videos-section">

        <div className="section-header">

          <div>
            <h2>All Videos</h2>

            <p>
              Your video library
            </p>
          </div>

          <span className="video-count">
            {videos.length} Videos
          </span>

        </div>


        {videos.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🎥
            </div>

            <h3>
              No Videos Found
            </h3>

            <p>
              Upload your first video to
              get started.
            </p>

          </div>

        ) : (

          <div className="video-grid">

            {videos.map((video) => (

              <article
                className="video-card"
                key={video._id}
              >

                <div className="video-preview">

                  <video
                    controls
                    src={video.videoFile}
                    poster={video.thumbnail}
                  />

                </div>


                <div className="video-content">

                  <div className="video-title-row">

                    <h3>
                      {video.title}
                    </h3>

                    <span
                      className={
                        video.isPublished
                          ? "status published"
                          : "status hidden"
                      }
                    >
                      {video.isPublished
                        ? "Published"
                        : "Hidden"}
                    </span>

                  </div>


                  <p className="video-description">
                    {video.description}
                  </p>


                  <div className="video-info">

                    <span>
                      👁 {video.views} Views
                    </span>

                  </div>


                  <div className="video-actions">

                    <button
                      className="publish"
                      onClick={() =>
                        handlePublish(video._id)
                      }
                    >
                      {video.isPublished
                        ? "Unpublish"
                        : "Publish"}
                    </button>


                    <button
                      className="edit"
                      onClick={() =>
                        openEdit(video)
                      }
                    >
                      Edit
                    </button>


                    <button
                      className="delete"
                      onClick={() =>
                        handleDelete(video._id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

            {editingVideo && (

        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <div className="modal-header">

              <h2>Edit Video</h2>

              <button
                className="edit-close-button"
                onClick={() =>
                  setEditingVideo(null)
                }
              >
                ×
              </button>

            </div>


            <div className="edit-modal-form">
              <label>
                Video Title
              </label>

              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                placeholder="Enter video title"
              />


              <label>
                Description
              </label>

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                placeholder="Enter video description"
              />


             <div className="edit-modal-buttons">

                <button
                  className="cancel"
                  onClick={() =>
                    setEditingVideo(null)
                  }
                >
                  Cancel
                </button>


                <button
                  className="save"
                  onClick={saveEdit}
                >
                  Save Changes
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;