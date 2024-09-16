import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Container,
  Typography,
  Button,
} from "@mui/material";

const Test = () => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleBookSelect = (book) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter((item) => item !== book));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const handleLogSelectedBooks = () => {
    console.log("Selected Books:", selectedBooks);
  };

  const books = [
    "To Kill a Mockingbird",
    "1984",
    "Pride and Prejudice",
    "The Great Gatsby",
    "Harry Potter Series",
  ];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        What are your favourite books?
      </Typography>
      <FormGroup>
        {books.map((book, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedBooks.includes(book)}
                onChange={() => handleBookSelect(book)}
              />
            }
            label={book}
          />
        ))}
      </FormGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogSelectedBooks}
      >
        Log Selected Books
      </Button>
    </Container>
  );
};

export default Test;
