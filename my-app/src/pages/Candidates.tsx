import React, { useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CandidateExperience } from "../DataSchema";
import ModalBox from "../components/ModalBox.tsx";
import StarRating from "../components/Rating.tsx";
import DeleteIcon from '@mui/icons-material/Delete';


const Candidates = () => {
  const [experienceData, setExperienceData] = useState<CandidateExperience[]>(
    []
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleDelete=(id:any)=>{
    setExperienceData(experienceData.filter((e)=>e.id!=id))
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 90,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
    },
    {
      field: "feedback",
      headerName: "Interview Feedback",
      width: 200,
    },
    {
      field: "rating",
      headerName: "Rating",
      width: 200,
      headerAlign: "center",
      renderCell: (params) =>{
        return (
        <>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <StarRating value={params.value}/>
          </Stack>
        </>
      )},
    },{
      field: "delete",
      headerName: "Delete",
      width: 60,
      renderCell: (params) =>{
        return (
        <>
          <DeleteIcon sx={{color:"red"}} onClick={()=>handleDelete(params.id)}/>
        </>
      )},
    },
  ];

  return (
    <div>
      <Box sx={{}}>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Interview Experience
        </h1>

        <ModalBox
          open={modalOpen}
          setOpen={setModalOpen}
          experienceData={experienceData}
          setExperienceData={setExperienceData}
        />
        <Box
          sx={{ height: 400, width: "80%", margin: "5%" }}
        >
          <Button sx={{ color:"grey",display: "flex", alignItems: "start",backgroundColor:'primary' }} onClick={handleClick}>
            Add Row
          </Button>
          {experienceData.length > 0 && (
            <DataGrid
              sx={{
                color:'white',
                display:'flex',
                justifyContent:'center',
                alignContent:"center",
                textAlign:'center',
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                "& .super-app-theme--header": {
                  textEmphasisColor:"white"
                },
                textColor: "primary.light",
              }}
              getRowId={(row: CandidateExperience) => row.id}
              rows={experienceData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Candidates;
