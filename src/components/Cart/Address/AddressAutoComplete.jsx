import { List, ListItem, ListItemText, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useState } from "react";

const FormContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  maxWidth: 800,
  width: 550,
  margin: 30,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const SuggestionList = styled(List)(({ theme }) => ({
  position: "absolute",
  zIndex: 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  width: "100%",
  maxHeight: 200,
  overflowY: "auto",
}));

const SuggestionItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  width: "100%",
}));

function AddressAutoComplete({ setShowButton }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://api.radar.io/v1/search/autocomplete`,
          {
            params: {
              query: value,
            },
            headers: {
              Authorization: `${import.meta.env.VITE_APP_RADAR_API_KEY}`,
            },
          }
        );

        // Ensure the response data is an array
        const addresses = response.data.addresses;
        if (Array.isArray(addresses)) {
          setSuggestions(addresses);
        } else {
          setSuggestions([]);
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (address) => {
    setQuery(address);
    setSuggestions([]);
    setTimeout(() => {
      setShowButton(true);
    }, [500]);
  };

  return (
    <FormContainer>
      <TextFieldStyled required label="Name" />
      <TextFieldStyled required label="10-digit Mobile Number" />
      <TextFieldStyled required label="Pincode" />
      <TextFieldStyled
        label="Address"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
      />
      {suggestions && suggestions.length > 0 && (
        <SuggestionList>
          {suggestions &&
            suggestions.map((suggestion, index) => (
              <SuggestionItem
                key={index}
                onClick={() =>
                  handleSuggestionClick(suggestion.formattedAddress)
                }
              >
                <ListItemText primary={suggestion.formattedAddress} />
              </SuggestionItem>
            ))}
        </SuggestionList>
      )}
    </FormContainer>
  );
}

export default AddressAutoComplete;
