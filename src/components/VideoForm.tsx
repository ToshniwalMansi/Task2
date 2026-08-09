import { useState } from "react";
import { uploadVideo } from "../services/video";

interface Props {
  refreshVideos: () => void;
}

function VideoForm({ refreshVideos }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile || !thumbnail) {
      alert("Please select both video and thumbnail.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      await uploadVideo(formData);

      alert("Video Uploaded Successfully!");

      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);

      refreshVideos();
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="upload-card">
      <h2>📤 Upload New Video</h2>

      <form onSubmit={handleSubmit} className="upload-form">

        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="file-box">
          <label>🎥 Select Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) =>
              e.target.files &&
              setVideoFile(e.target.files[0])
            }
          />
        </div>

        <div className="file-box">
          <label>🖼 Select Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files &&
              setThumbnail(e.target.files[0])
            }
          />
        </div>

        <button>
          Upload Video
        </button>

      </form>
    </div>
  );
}

export default VideoForm;