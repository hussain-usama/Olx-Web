import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from '@mui/material';

export default function MapsAutocomplete() {
    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: 'AIzaSyDTTxdTRLIfzz4XsR1Rua-MsYx7yvYmW24',
        onPlaceSelected: (place) => {
            console.log(place,'google map autocomplete');
        }
    });

    return (
        <TextField
            ref={ref}
            id="outlined-basic"
            label="Enter your Location"
            name='info'
            style={{ width: '500px' }}
        />
    )
       
}