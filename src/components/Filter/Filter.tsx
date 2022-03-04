import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import BasicSelectStatus from "../../selectitems/BasicSelectStatus";
import BasicSelectCategory from "../../selectitems/BasicSelectCategory";

function Filter(props: any) {
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
        <FormControl>
          <BasicSelectCategory
            name={props.categoryName}
            list={props.categoryList}
            getAllStatus={props.getAllStatus}
          />
        </FormControl>
        <FormControl>
          <BasicSelectStatus
            name={props.statuName}
            list={props.statuList}
            categoryList={props.categoryList}
          />
        </FormControl>
        <Button
          variant="outlined"
          sx={{ height: "55px" }}
        >
          Filter
        </Button>
        <Button
          variant="contained"         
          sx={{ height: "55px" }}
        >
          Clear Filter
        </Button>
      </Box>
    </div>
  );
}

export default Filter;