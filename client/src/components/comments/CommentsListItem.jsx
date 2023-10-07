import { Avatar, Box, Divider, Rating, Typography } from "@mui/material";


export default function CommentsListItem({ commentItem }) {
  return (
    <>
      <Divider />
      <Box minHeight='150px' direction="row" width='100%'>
        <Box p={5} display="flex" gap="2rem">
          <Avatar sx={{ width: 56, height: 56 }} src={commentItem.img_avatar} alt='' />
          <Box width='80%'>
            <Typography textTransform='capitalize' variant="h5" fontWeight="bold">
              {commentItem.name} {commentItem.lastname}
            </Typography>
            <Typography mt='0.5rem' color="warning">{commentItem.comment}</Typography>
          </Box>
          <Box display='flex' flexDirection='column' justifyContent='space-between'>
            <Rating value={4} readOnly />
            <Typography fontStyle='italic' textAlign='right'>{(commentItem.date).split("T")[0].split("-").reverse().join("-")}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}