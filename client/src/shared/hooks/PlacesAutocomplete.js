import React from 'react'
import usePlacesAutocomplete from "use-places-autocomplete"
import useOnclickOutside from "react-cool-onclickoutside"
import { Input } from '../../components/Roaster/style'
import { StyledAddressUl, StyledAddressLi } from '../../shared-style';

export const PlacesAutocomplete = ({ setAddress }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 1000,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
    setAddress(description)
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <StyledAddressLi key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </StyledAddressLi>
      );
    });

  return (
    <div style={{ width: '100%', position: 'relative', marginBottom: '15px' }} ref={ref}>
      <Input
        style={{ marginBottom: 0 }}
        id="address"
        name="address"
        value={value}
        onChange={handleInput}
        disabled={!ready}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <StyledAddressUl>{renderSuggestions()}</StyledAddressUl>}
    </div>
  );
};