import React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import BasicSelectCategory from "../../selectitems/BasicSelectCategory";
import BasicSelectStatus from "../../selectitems/BasicSelectStatus";

function TodoItem(props: any) {
  return (
    <div>
      <Box>
        <List
          sx={{
            width: "100%",
            backgroundColor: "#b3f2c8",
          }}
        >
          {props.todoList.map((value: any) => (
            <ListItem
              sx={{ margin: "10px" }}
              key={value.id}
              disableGutters
              secondaryAction={
                <IconButton>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <BasicSelectCategory
                      name={props.categoryName}
                      list={props.categoryList}
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <BasicSelectStatus
                      name={props.statuName}
                      list={props.statuList}
                    />
                  </FormControl>
                </IconButton>
              }
            >
              <ListItemText primary={`${value.text}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default TodoItem;