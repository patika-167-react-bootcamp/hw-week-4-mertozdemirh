import React, { useState } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function Modals(props: any) {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          marginTop: "20px",
          marginLeft: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        <Button
          variant="contained"
          sx={{ height: "55px" }}
          onClick={props.handleOpen}
        >
          Edit Category
        </Button>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title">Category</h2>
            <Box>
              <TextField
                id="outlined-basic"
                label="Category"
                variant="outlined"
                onChange={(event: any) =>
                  props.setCategoryText(event.target.value)
                }
                value={props.categoryText}
              />
              <Button
                variant="outlined"
                sx={{ marginLeft: "30px", height: "55px" }}
                onClick={props.handleCategoryAdded}
              >
                Add Category
              </Button>
            </Box>
            <Box>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 650,
                  marginTop: "5px",
                  padding: "5px",
                  backgroundColor: "#b3f2c8",
                }}
              >
                {props.categoryList.map((value: any) => (
                  <ListItem
                    sx={{ marginTop: "10px" }}
                    key={value.id}
                    disableGutters
                    secondaryAction={
                      <IconButton>
                        <FormControl sx={{ m: 1, minWidth: 150 }}>
                          <Button variant="outlined">
                            <ChildModal
                              statuList={props.statuList}
                              setStatu={props.setStatuList}
                              statuText={props.statuText}
                              setStatuText={props.setStatuText}
                              categoryId={value.id}
                              categoryTitle={value.title}
                              handleStatusAdded={props.handleStatusAdded}
                            />
                          </Button>
                        </FormControl>
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${value.title}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button onClick={props.handleClose}>Close Category</Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
}

export default Modals;

function ChildModal({
  statuList,
  statuText,
  setStatuText,
  categoryId,
  categoryTitle,
  handleStatusAdded,
}: any) {
  const [color, setColor] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let statuAdd = {
      title: statuText,
      color: color,
      categoryId: categoryId,
    };
    handleStatusAdded(statuAdd);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Edit Statu</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">Category: {categoryTitle}</h2>
          <h4 id="child-modal-title">Statu</h4>
          <TextField
            id="outlined-basic"
            label="Statu"
            variant="outlined"
            onChange={(event: any) => setStatuText(event.target.value)}
            value={statuText}
          />
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="categorySelect"
              value={color}
              label="Color"
              onChange={handleChange}
            >
              <MenuItem value="Green">Green</MenuItem>
              <MenuItem value="Yellow">Yellow</MenuItem>
              <MenuItem value="Red">Red</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            sx={{ height: "55px" }}
            onClick={handleSubmit}
          >
            Add Statu
          </Button>
          <Box>
            <List
              sx={{
                width: "100%",
                maxWidth: 650,
                marginTop: "5px",
                padding: "5px",
                backgroundColor: "#c5cae9",
              }}
            >
              {statuList.map((value: any) => (
                <ListItem
                  sx={{ marginTop: "10px" }}
                  key={value.id}
                  disableGutters
                  secondaryAction={
                    <IconButton>
                      <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <Box>
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "10px", height: "30px" }}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ marginLeft: "10px", height: "30px" }}
                          >
                            Edit
                          </Button>
                        </Box>
                      </FormControl>
                    </IconButton>
                  }
                >
                  <ListItemText primary={`${value.title}`} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button onClick={handleClose}>Close Statu</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
