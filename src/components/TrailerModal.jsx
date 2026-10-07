import { Close as CloseIcon } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

export const TrailerModal = ({ open, onClose, videoKey, title }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#0a0a0c",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          px: 2,
        }}
      >
        <Typography variant="subtitle1" color="white" sx={{ fontWeight: 600 }}>
          {title} — Official Trailer
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {videoKey ? (
          <Box sx={{ position: "relative", pt: "56.25%", width: "100%" }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              title="YouTube movie trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
            />
          </Box>
        ) : (
          <Box sx={{ p: 6, textAlign: "center", color: "white" }}>
            <Typography>No trailer available for this movie.</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
