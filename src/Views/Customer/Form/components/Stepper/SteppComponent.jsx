import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
// import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HeadingText from "../../../../../components/Text/HeadingText";
import BodyText from "../../../../../components/Text/BodyText";
const SteppComponent = ({ data, index, setFormData, formData }) => {
  console.log(data, "+++++++");
  const [selectedItem, setSelectedItem] = useState(null);
  const stepFormData = formData[index] || {};
  const [isFirstQuestion, setIsFirstQuestion] = useState(index === 0);
  useEffect(() => {
    setIsFirstQuestion(index === 0);
  }, [index]);
  const handleChangeField = (e) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...stepFormData,
      [name]: value,
      question: data.question,
      ans: e.target.value,
      type: data.type,
      title: data.title,
    };
    setFormData(updatedFormData);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...stepFormData,
      [data.question]: value,
      question: data.question,
      ans: event.target.value,
      type: data.type,
      title: data.title,
    };
    setFormData(updatedFormData);
  };

  const handleChangeFrom = (event) => {
    const value = event.target.value;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...stepFormData,
      [data.question + "_from"]: value,
      question: data.question,
      ans_from: event.target.value,
      type: data.type,
      title: data.title,
    };
    setFormData(updatedFormData);
  };

  const handleChangeTo = (event) => {
    const value = event.target.value;
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...stepFormData,
      [data.question + "_to"]: value,
      question: data.question,
      ans_to: event.target.value,
      type: data.type,
      title: data.title,
    };
    setFormData(updatedFormData);
  };

  const handleCheckboxChange = (option) => {
    const updatedData = stepFormData[data.question]
      ? [...stepFormData[data.question]]
      : []; // Make a copy of the array if it exists, or initialize it
    const optionIndex = updatedData.indexOf(option);

    if (optionIndex === -1) {
      // If the option is not already selected, add it
      updatedData.push(option);
    } else {
      // If the option is already selected, remove it
      updatedData.splice(optionIndex, 1);
    }

    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[index] = {
        ...stepFormData,
        [data.question]: updatedData,
        question: data.question,
        ans: updatedData.join(", "), // Join selected options into a string
        type: data.type,
        title: data.title,
      };
      return updatedFormData;
    });
  };

  const handleRadio = (currentIndex) => {
    setSelectedItem(currentIndex === selectedItem ? null : currentIndex);
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...stepFormData,
      [data.question]:
        currentIndex === selectedItem
          ? null
          : data.answers[currentIndex].answer,
      question: data.question,
      ans: data.answers[currentIndex].answer,
      type: data.type,
      title: data.title,
    };
    setFormData(updatedFormData);
  };

  const [selectedValues, setSelectedValues] = useState(
    stepFormData[data.question] || []
  );

  const handleSelectChange = (event, value) => {
    setSelectedValues(value);
    handleChange(event, data.question, value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getCategory = (answers) => {
    if (answers.includes("BTS")) {
      return "BTS";
    } else if (answers.includes("MRT")) {
      return "MRT";
    } else {
      return "Area";
    }
  };

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(data.question, "Question");
  return (
    <Box>
      <Box sx={{ px: 4 }}>
        <HeadingText
          variant="h5"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
          dangerouslySetInnerHTML={{ __html: data.question }}
        />
      </Box>

      {data.type === "textarea" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <TextField
            sx={{ width: "500px" }}
            placeholder="Description"
            multiline
            // fullWidth
            rows={6}
            name={data.question}
            value={stepFormData[data.question] || ""}
            onChange={handleChangeField}
          />
        </Box>
      )}
      {data.type === "text" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <TextField
            sx={{ width: "300px" }}
            placeholder="eg: 5000"
            // multiline
            // rows={6}
            name={data.question}
            value={stepFormData[data.question] || ""}
            onChange={handleChangeField}
          />
        </Box>
      )}
      {/* {console.log(data, "hi")} */}
      {data.type === "selectrange" && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {data.unit === "฿" && (
            <BodyText
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px 5px 22px 0px",
                // fontSize: "20px",
              }}
            >
              ฿
            </BodyText>
          )}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Min</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stepFormData[data.question + "_from"] || ""}
              label="Min"
              onChange={handleChangeFrom}
            >
              {data.answers.map((val) => (
                <MenuItem key={val.id} value={val.answer}>
                  {val.answer}
                </MenuItem>
              ))}
            </Select>
            <Typography sx={{ textAlign: "center" }}>Min</Typography>
          </FormControl>
          {data.unit !== "฿" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px 0px 22px 5px",
                fontSize: "15px",
                ml: 1,
              }}
            >
              <span style={{ fontSize: "20px" }}>m </span>
              <span style={{ marginLeft: 2, fontSize: "20px" }}>sq</span>{" "}
            </Box>
          )}
          {data.unit === "฿" && (
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px 0px 22px 5px",
                fontSize: "20px",
              }}
            >
              {" "}
              ฿
            </Typography>
          )}
          <FormControl fullWidth sx={{ ml: 1 }}>
            <InputLabel id="demo-simple-select-label">Max</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={stepFormData[data.question + "_to"] || ""}
              label="Max"
              onChange={handleChangeTo}
            >
              {data.answers.map((val) => (
                <MenuItem key={val.id} value={val.answer}>
                  {val.answer}
                </MenuItem>
              ))}
            </Select>

            <Typography sx={{ textAlign: "center" }}>Max</Typography>
          </FormControl>
          {data.unit !== "฿" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px 0px 22px 5px",
                fontSize: "15px",
                ml: 1,
              }}
            >
              <span style={{ fontSize: "20px" }}>m </span>
              <span style={{ marginLeft: 2, fontSize: "20px" }}>sq</span>{" "}
            </Box>
          )}
        </Box>
      )}
      {data.type === "checkbox" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            mt: 3,
            height: "100%",
            mb: 10,
          }}
        >
          <Grid container spacing={0}>
            {data.answers.map((item, idx) => (
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    // border: '1px solid #EAEAEA',
                    // boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.1)'
                    //   border:
                    //     stepFormData[data.question] === item.answer
                    //       ? "3px solid #0A6EB7"
                    //       : null,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Box width={"90%"}>
                        {item.answer.startsWith("BTS") &&
                          data.answers.findIndex((val) =>
                            val.answer.startsWith("BTS")
                          ) === idx && (
                            <Typography
                              sx={{
                                marginBottom: 1,
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              BTS
                            </Typography>
                          )}
                        {item.answer.startsWith("MRT") &&
                          data.answers.findIndex((val) =>
                            val.answer.startsWith("MRT")
                          ) === idx && (
                            <Typography
                              sx={{
                                marginBottom: 1,
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              MRT
                            </Typography>
                          )}
                        {isFirstQuestion &&
                          !(
                            item.answer.startsWith("BTS") ||
                            item.answer.startsWith("MRT")
                          ) &&
                          data.answers.findIndex(
                            (val) =>
                              !val.answer.startsWith("BTS") &&
                              !val.answer.startsWith("MRT")
                          ) === idx && (
                            <Typography
                              sx={{
                                marginBottom: 1,
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              AREA
                            </Typography>
                          )}
                        <Typography sx={{ fontSize: "18px" }}>
                          {item.answer}
                        </Typography>
                        {/* <Divider sx={{ width: '100%' }} /> */}
                      </Box>
                      <Box width={"10%"}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              icon={
                                <FiberManualRecordOutlinedIcon
                                  sx={{ fontSize: "30px", color: "black" }}
                                />
                              }
                              checkedIcon={
                                <CheckCircleIcon
                                  sx={{
                                    fontSize: "25px",
                                    color: theme.palette.primary.main,
                                  }}
                                />
                              }
                              checked={stepFormData[data.question]?.includes(
                                item.answer
                              )}
                              onChange={() => handleCheckboxChange(item.answer)}
                            />
                          }
                          // label={item.answer}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {data.type === "radio" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",

            mt: 3,
            height: "100%",
            mb: 10,
          }}
        >
          <Grid container spacing={0}>
            {data.answers.map((item, idx) => (
              <Grid item xs={12} sm={12} lg={12} md={12}>
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    // border: '1px solid #EAEAEA',
                    // boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.1)'
                    //   border:
                    //     stepFormData[data.question] === item.answer
                    //       ? "3px solid #0A6EB7"
                    //       : null,
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Box width={"90%"}>
                        <Typography
                          sx={{ fontSize: isSmall ? "15px" : "18px" }}
                        >
                          {item.answer}
                        </Typography>
                        {/* <Divider sx={{ width: '100%' }} /> */}
                      </Box>
                      <Box width={"10%"}>
                        <FormControlLabel
                          key={idx}
                          value={stepFormData[data.question]}
                          control={
                            <Checkbox
                              icon={
                                <FiberManualRecordOutlinedIcon
                                  sx={{ fontSize: "30px", color: "black" }}
                                />
                              }
                              checkedIcon={
                                <CheckCircleIcon
                                  sx={{
                                    fontSize: "25px",
                                    color: theme.palette.primary.main,
                                  }}
                                />
                              }
                              checked={
                                stepFormData[data.question] === item.answer
                              }
                              onChange={() => handleRadio(idx)}
                            />
                          }
                          // label={item.answer}
                          sx={{ mr: 0 }}
                        />
                        {/* }
                          // label={item.answer}
                          /> */}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {data.type === "select" && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="demo-simple-select-label">Select One</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={stepFormData[data.question] || ""}
            label="Select One"
            onChange={handleChange}
          >
            {data.answers.map((val) => (
              <MenuItem key={val.id} value={val.answer}>
                {val.answer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {data.type === "multiselect" && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel id="demo-mutiple-chip-label">{data.label}</InputLabel>
          <Autocomplete
            multiple
            label="Select Multiple Categories"
            id="demo-mutiple-chip"
            open={open}
            onOpen={handleOpen}
            onClose={handleClose}
            value={selectedValues}
            onChange={handleSelectChange}
            options={data.answers.map((val) => ({
              category: getCategory(val.answer),
              value: val.answer,
            }))}
            groupBy={(option) => option.category}
            getOptionLabel={(option) => option.value}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  label={option.value}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder={
                  selectedValues.length > 0 ? "" : "Select Multiple Categories"
                }
              />
            )}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </FormControl>
      )}
      {/* {console.log(data, 'dddddd')} */}
    </Box>
  );
};

export default SteppComponent;
