import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "../../styles";
import { useDispatch } from "react-redux";
import {
  uploadFormImages,
  uploadFormVideo,
} from "../../../../../../../store/actions/agentActions/agentFormActions";
const { title, uploadBox, upload_image, s_format, s_format2, btn } = styles;

const Upload = ({ onUpload }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoSizeError, setVideoSizeError] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const files_img = event.target.files;
    setSelectedFiles(files_img);

    const formData = new FormData();
    for (let i = 0; i < files_img.length; i++) {
      formData.append("files[]", files_img[i]);
    }

    dispatch(uploadFormImages(formData))
      .then((result) => {
        console.log(result.data);
        const imageIds = result.data.data.images.map((image) => image.id);
        onUpload({ images: JSON.stringify(Object.assign({}, imageIds)) });
        // console.log(imageIds);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size <= 25 * 1024 * 1024) {
        setSelectedVideo(file);
        setVideoName(file.name);
        setVideoSizeError(false);
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        dispatch(uploadFormVideo(formData))
          .then((result) => {
            setLoading(false);
            // console.log(result.data.data.image.id);
            onUpload({ video: result.data.data.image.id });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
        // onUpload({ video: file });
      } else {
        setSelectedVideo(null);
        setVideoSizeError(true);
      }
    }
  };

  const handleBoxClick = (event) => {
    event.preventDefault();
    document.getElementById("upload-input").click();
  };
  const handleLinkChange = (event) => {
    onUpload({ video_link: event.target.value });
  };
  const theme = useTheme();
  return (
    <>
      <Typography sx={title}>Upload Images Of Your Property</Typography>
      <Box
        sx={{
          padding: "20px 35px",
          mb: 2,
          [theme.breakpoints.down("md")]: {
            padding: "20px 10px",
          },
        }}
      >
        <label htmlFor="upload-input">
          <Box sx={uploadBox} onClick={handleBoxClick}>
            <img alt="upload-icon" src="/Upload-icon.png" />
            <Typography sx={upload_image}>Upload Images</Typography>
            <Typography sx={s_format}>
              Supported formats: Any image format, pdf, doc, docx, txt
            </Typography>
            <Typography fontWeight="bold">
              {selectedFiles.length} files selected
            </Typography>
          </Box>
        </label>
        <input
          id="upload-input"
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          multiple
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </Box>
      <Typography sx={title}>Upload Video Of Your Property</Typography>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoSelect}
          style={{ display: "none" }}
          id="upload-video"
        />
        <Button
          sx={btn}
          onClick={() => document.getElementById("upload-video").click()}
        >
          Add Video
        </Button>
        {selectedVideo && <Typography sx={{ ml: 2 }}>{videoName}</Typography>}
        {loading && (
          <Typography sx={{ ml: 2, fontWeight: "bold" }}>
            Uploading... <LinearProgress />
          </Typography>
        )}
        {videoSizeError && (
          <Typography sx={{ color: "red", ml: 2 }}>
            Video size exceeds 25MB limit
          </Typography>
        )}
      </Box>
      <Typography sx={{ ...s_format2, mt: 2 }}>
        Add videos of your property from Youtube. Upload on Youtube and paste
        the link below.<strong>(Max limt: 25MB)</strong>
      </Typography>
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography sx={{ my: 3 }} fontWeight="bold">
          OR
        </Typography>
        <TextField
          fullWidth
          placeholder="Paste a link of your video"
          onChange={handleLinkChange}
        />
      </Box>
    </>
  );
};

export default Upload;
