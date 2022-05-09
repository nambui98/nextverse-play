import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Slider } from "@mui/material";

const CustomSlider = withStyles({
  rail: {
    backgroundImage: "linear-gradient(270deg, #EC0CB7 0.64%, #C740D1 100%)"
  },
  track: {
    backgroundImage: "linear-gradient(270deg, #EC0CB7 0.64%, #C740D1 100%)"
  },
  thumb: {
    height: 24,
    width: 24
  }
})(Slider);

export default function SliderCustom() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event,
    newValue: number | number[],
    activeThumb: number,) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - 10), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + 10)]);
    }
  };

  return (
    <CustomSlider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      sx={{ height: "6px" }}
    />
  );
}
